import {
    Component, OnInit, OnDestroy, Input, Output, HostBinding,
    HostListener, Renderer, EventEmitter, ElementRef, ViewChild,
    ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
    selector: 'selection',
    template: `
        <div class="select selection input" [class.is-multiple]="multiple" *ngIf="disabled">
            <div class="selection-item"
                  [ngClass]="m._itemClass"
                  [ngStyle]="m._itemStyle"
                  *ngFor="let m of selectedItems">
                <div class="selection-item-text">{{m | localizedName:textKey}}</div>
                <div class="selection-item-description" *ngIf="descriptionKey">{{m[descriptionKey]}}</div>
            </div>
        </div>
        <div class="select selection"
              [class.open]="isOpen"
              [class.is-focused]="isFocused"
              [class.is-multiple]="multiple"
              [class.allow-clear]="isAllowClear"
              [class.has-selected]="hasSelected"
              [class.select-loading]="loading"
              *ngIf="!disabled">
            <div class="select-selection input" (click)="toggleOpen($event)">
                <input *ngIf="searchable"
                    #searchInput
                    class="select-search-input"
                    name="search"
                    value=""
                    autocomplete="off"
                    [tabindex]="tabIndex"
                    (focus)="onFocus($event)"
                    (blur)="onBlur($event)"
                    (keyup)="handleEvent($event)" />
                <div class="select-selected-items">
                    <div class="selection-item"
                        [ngClass]="m._itemClass"
                        [ngStyle]="m._itemStyle"
                        (click)="remove(m, $event)"
                        *ngFor="let m of selectedItems">
                        <div class="selection-item-text">{{m | localizedName:textKey}}</div>
                        <div class="selection-item-description" *ngIf="descriptionKey">{{m[descriptionKey]}}</div>
                    </div>
                </div>
                <span class="placeholder">{{placeHolder}}</span>
                <span class="select-clear" (click)="clear($event)">&times;</span>
                <div class="select-search-not-found" *ngIf="showNotFound && notFoundText">{{notFoundText}}</div>
                <i class="loading-round select-loader-icon"></i>
            </div>
            <div class="select-dropdown">
                <ul class="select-list scroll-shadow" #selectList (scroll)="onScroll($event)">
                    <li class="select-option"
                          [class.selected]="selectedItemIds.indexOf(m[idKey]) !== -1"
                          [class.focus]="cursorId === m[idKey]"
                          [attr.data-id]="m[idKey]"
                          (click)="add(m)"
                          *ngFor="let m of filteredItems">
                        <i class="select-checkmark-icon"></i>
                        <div [ngClass]="m._itemClass" [ngStyle]="m._itemStyle">
                            <div class="selection-item-text">{{m | localizedName:textKey}}</div>
                            <div class="selection-item-description" *ngIf="descriptionKey">{{m[descriptionKey]}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SelectionComponent {
    @HostBinding('tabIndex') get _tabIndex() { return -1; }

    @HostListener('focus', ['$event']) public onFocus($event: MouseEvent): void {
        if (this.disabled) {
            return;
        }

        this.isFocused = true;
    }

    @HostListener('blur', ['$event']) public onBlur($event: MouseEvent): void {
        if (this.disabled || this.selfClick) {
            return;
        }

        this.close();
        this.clearSearchInput();
    }

    @HostListener('click', ['$event']) public onClick($event: MouseEvent): void {
        this.selfClick = true;
    }

    @HostListener('mousedown', ['$event']) public onMouseDown($event: MouseEvent): void {
        this.selfClick = true;
        setTimeout(() => {
            this.selfClick = false;
        }, 50);
    }

    @HostListener('keydown', ['$event']) public onKeyDown($event: KeyboardEvent): void {
        if (this.disabled) {
            return;
        }

        this.handleEvent($event);
    }

    @Input('items') set _items(items: any[]) {
        this.setItems(items);
    };
    @Input('selectedItems') set _selectedItems(selectedItems: any[]) {
        if (Array.isArray(selectedItems)) {
            this.selectedItems = selectedItems;
        } else {
            this.selectedItems = selectedItems ? [selectedItems] : [];
        }
    };
    @Input() idKey: string = 'id';
    @Input() textKey: string = 'name';
    @Input() descriptionKey: string;
    @Input() multiple = false;
    @Input() disabled = false;
    @Input() allowClear = false;
    @Input() searchable = false;
    @Input() url = '';
    @Input() listPath = null;
    @Input() totalPagesPath = null;
    @Input() pagePath = null;
    @Input() pageParam = 'page';
    @Input() searchParam = 'keyword';
    @Input() tabIndex = 0;
    @Input() checkmarkIconClass = 'fa fa-check';
    @Input() placeHolder: string = '';
    @Input() notFoundText: string = 'Not found';

    @Output() load = new EventEmitter<any>();
    @Output() change = new EventEmitter<any>();

    @ViewChild('searchInput') searchInput: ElementRef;
    @ViewChild('selectList') selectList: ElementRef;

    private documentClickListener;
    private documentKeyUpListener;

    private items: any = [];
    private selectedItems: any = [];
    private filteredItems: any = [];
    private selectedItemIds: string[] = [];
    private isOpen = false;
    private isFocused = false;
    private isInitialized = false;
    private selfClick = false;
    private firstOpen = true;
    private showNotFound = false;

    private allLoaded = false;
    private loading = false;
    private page = 0;
    private totalPages = 1;
    private keyWord = '';

    private SEARCH_MODE = 0;
    private MOVE_MODE = 1;
    private cursorMode = 1;
    private cursorId;
    private cursorPosition = -1;

    constructor(
        private http: Http,
        private renderer: Renderer,
        private ref: ChangeDetectorRef
    ) { }

    ngOnInit() {
        if (this.disabled) {
            return;
        }

        this.isInitialized = true;
        this.allLoaded = this.url.length === 0;

        if (this.multiple) {
            this.filterItems();
        }

        this.resetCursor();
        this.checkSelected();
    }

    ngOnDestroy() {
        if (this.isInitialized) {
            this.close();
        }
    }

    // ===
    get isAllowClear() {
        return this.allowClear && this.selectedItems.length;
    }

    get hasSelected() {
        return this.selectedItems.length;
    }

    // ===
    initListenGlobal() {
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            if (!this.selfClick) {
                this.close();
                this.clearSearchInput();
            } else {
                this.selfClick = false;
            }
        });

        this.documentKeyUpListener = this.renderer.listenGlobal('body', 'keyup', (event) => {
            if (event.code === 'Escape') {
                this.close();
                this.clearSearchInput();
            }
        });
    }

    removeListenGlobal() {
        if (!this.disabled) {
            this.documentClickListener && this.documentClickListener();
            this.documentKeyUpListener && this.documentKeyUpListener();
        }
    }

    // ===
    emitChange() {
        if (this.multiple) {
            this.change.emit(this.selectedItems);
        } else {
            this.change.emit(this.selectedItems[0]);
        }
    }

    setItems(items: any[]) {
        this.items = items;
        this.filterItems();
        this.ref.markForCheck();
    }

    appendToItems(items: any[]) {
        this.items = this.items.concat(items);
        this.filterItems();
        this.ref.markForCheck();
    }

    checkSelected() {
        this.selectedItemIds = this.selectedItems.map(it => it[this.idKey]);
    }

    add(item) {
        if (this.multiple) {
            if (this.selectedItems.filter(it => it[this.idKey] == item[this.idKey]).length === 0) {
                this.selectedItems.push(item);
                this.selectedItemIds = this.selectedItems.map(it => it[this.idKey]);
            }
        } else {
            this.selectedItems = [item];
            this.selectedItemIds = [item[this.idKey]];
            this.close();
        }
        this.emitChange();
        this.clearSearchInput();
        this.filterItems();
    }

    remove(item, $event) {
        if (!this.multiple) {
            return;
        }

        $event.stopPropagation();
        $event.preventDefault();
        if (this.multiple) {
            this.selectedItems = this.selectedItems.filter(it => it[this.idKey] != item[this.idKey]);
            this.selectedItemIds = this.selectedItems.map(it => it[this.idKey]);
        } else {
            this.selectedItems = [];
            this.selectedItemIds = [];
        }
        this.emitChange();
        this.clearSearchInput();
        this.filterItems();
        this.close();
    }

    clear($event) {
        if (this.selectedItemIds.length || this.selectedItems.length) {
            $event.stopPropagation();
            this.selfClick = false;
            this.selectedItems = [];
            this.selectedItemIds = [];
            this.emitChange();
            this.clearSearchInput();
            this.filterItems();
        }
    }

    clearSearchInput() {
        if (this.searchable && this.searchInput) {
            this.searchInput.nativeElement.value = '';
        }
    }

    // ===
    filterItems(keyWord?: string) {
        if (keyWord) {
            this.filteredItems = this.items.filter(it => {
                return it[this.textKey].toLowerCase().indexOf(keyWord) != -1;
            });
        } else if (this.multiple) {
            this.filteredItems = this.items.filter(it => {
                return this.selectedItemIds.indexOf(it[this.idKey]) == -1;
            });
        } else {
            this.filteredItems = this.items;
        }

        if (this.filteredItems.length === 0 || this.filteredItems.length !== this.items.length) {
            this.resetCursor();
        }

        this.selectFirst();
    }

    search(keyWord) {
        if (this.keyWord !== keyWord) {
            this.keyWord = keyWord;
            if (!this.allLoaded) {
                this.fetchContent({ search: keyWord });
            } else {
                this.filterItems(keyWord);
            }
            this.open();
        }
    }

    // ===
    handleEvent($event) {
        if ($event.type === 'keydown') {
            let keyCode = $event.key;

            if (keyCode === 'Enter') {
                if (this.cursorId && this.canMove()) {
                    this.addOnCursor();
                } else {
                    this.toggleOpen($event);
                }
                return;
            } else if (keyCode === 'Escape' || keyCode === 'Tab') {
                if (this.isOpen) {
                    this.close();
                }
                this.clearSearchInput();
                return;
            } else if (keyCode === 'Delete') {
                this.clear($event);
                return;
            }

            // toggle cursor mode
            if (this.cursorMode === this.SEARCH_MODE) {
                if ('ArrowUp' === keyCode || 'ArrowDown' === keyCode) {
                    this.cursorMode = this.MOVE_MODE;
                } else if ($event.target.value === '' && ('ArrowLeft' === keyCode || 'ArrowRight' === keyCode)) {
                    this.cursorMode = this.MOVE_MODE;
                }
            }

            if (this.cursorMode === this.MOVE_MODE && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(keyCode) != -1) {
                $event.preventDefault();
                this.move(keyCode);
            }
        } else if ($event.type === 'keyup' && $event.target.name === 'search') {
            $event.stopPropagation();
            this.cursorMode = this.SEARCH_MODE;
            this.search($event.target.value.toLowerCase());
        } else {
            console.log('SelectionComponent::handleEvent > unknown', $event);
        }
    }

    // === cursor
    move(direction) {
        if (!this.canMove()) {
            return;
        }

        switch (direction) {
            case 'ArrowUp':
                if (this.cursorPosition === -1) {
                    this.cursorPosition = this.filteredItems.length - 1;
                } else {
                    this.cursorPosition--;
                    if (this.cursorPosition < 0) {
                        this.cursorPosition = this.filteredItems.length - 1;
                    }
                }
                break;
            case 'ArrowDown':
                if (this.cursorPosition === -1) {
                    this.cursorPosition = 0;
                } else {
                    this.cursorPosition++;
                    if (this.cursorPosition >= this.filteredItems.length) {
                        this.cursorPosition = 0;
                    }
                }
                break;
            case 'ArrowLeft':
                this.cursorPosition = 0;
                break;
            case 'ArrowRight':
                this.cursorPosition = this.filteredItems.length - 1;
                break;
            default:
                return;
        }

        this.cursorId = this.filteredItems[this.cursorPosition][this.idKey];
        this.scrollToCursor();
    }

    canMove() {
        return this.isOpen && this.filteredItems.length > 0;
    }

    addOnCursor() {
        this.add(this.filteredItems[this.cursorPosition]);
    }

    scrollToCursor() {
        let listEl = this.selectList.nativeElement;
        let node = listEl.querySelector(`[data-id="${this.cursorId}"]`);
        listEl.scrollTop = node.offsetTop - (listEl.clientHeight / 2);
    }

    resetCursor() {
        this.cursorId = null;
        this.cursorPosition = -1;
        this.cursorMode = this.MOVE_MODE;
    }

    selectFirst() {
        if (this.cursorMode === this.SEARCH_MODE && this.filteredItems.length > 0) {
            this.cursorId = this.filteredItems[0].id;
            this.cursorPosition = 0;
            this.cursorMode = this.MOVE_MODE;
        }
    }

    // ===
    fetchContent($event) {
        this.load.emit($event);

        //
        if (this.allLoaded) {
            return;
        }

        if (!this.url) {
            return;
        }

        if ($event.first === true) {
            this.page = 1;
        } else if ($event.next === true) {
            this.page++;
        } else if ($event.search) {
            this.page = 1;
        }

        this.loading = true;
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json' });
        let url = `${this.url}&${this.pageParam}=${this.page}&${this.searchParam}=${encodeURIComponent(this.keyWord)}`;

        this.http.get(url, { headers: headers })
            .map(response => response.json())
            .subscribe(payload => {
                this.loading = false;

                this.findViewPath(payload);

                // destructuring
                // read items
                let itemPaths = this.listPath.split('.');
                let _list = payload;
                for (let it of itemPaths) {
                    _list = _list[it];
                }
                // read totalPages
                let totalPagesPath = this.totalPagesPath.split('.');
                let _totalPages = payload;
                for (let it of totalPagesPath) {
                    _totalPages = _totalPages[it];
                }
                // read page
                let pagePaths = this.pagePath.split('.');
                let _page = payload;
                for (let it of pagePaths) {
                    _page = _page[it];
                }

                this.page = _page;
                this.totalPages = _totalPages;

                if (this.totalPages < this.page) {
                    this.page = 1;
                }

                this.allLoaded = (this.totalPages <= this.page) && !this.keyWord;
                if (this.page === 1) {
                    this.setItems(_list);
                } else {
                    this.appendToItems(_list);
                }
            });
    }

    findViewPath(json: any) {
        if (this.listPath) {
            return;
        }

        if (json.payload && json.payload.viewpage) {
            this.listPath = 'payload.viewpage.result'
            this.totalPagesPath = 'payload.viewpage.maxPage';
            this.pagePath = 'payload.viewpage.page';
        } else if (json.objects) {
            let i = 0;
            for (let obj of json.objects) {
                if (obj.list && obj.meta && obj.type) {
                    this.listPath = `objects.${i}.list`;
                    this.totalPagesPath = `objects.${i}.meta.totalPages`;
                    this.pagePath = `objects.${i}.meta.page`;
                }
                i++;
            }
        } else {
            throw Error('not found list path');
        }
    }

    // ===
    open() {
        if (!this.isOpen) {
            this.initListenGlobal();
        }
        this.isOpen = true;
        this.isFocused = true;
        if (this.firstOpen) {
            this.firstOpen = false;
            this.fetchContent({ first: true });
        }
    }

    close() {
        this.isOpen = false;
        this.isFocused = false;
        this.resetCursor();
        this.removeListenGlobal();
    }

    toggleOpen($event) {
        $event.preventDefault();
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    onScroll($event) {
        let {scrollHeight, clientHeight, scrollTop} = $event.target;
        if ((scrollHeight - clientHeight) == scrollTop) { // scroll end
            this.fetchContent({ next: true });
        }
    }
}
