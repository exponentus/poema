import {
    Component, OnInit, OnDestroy, Input, Output, HostBinding,
    HostListener, Renderer, EventEmitter, ElementRef, ViewChild,
    ChangeDetectionStrategy
} from '@angular/core';

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
              *ngIf="!disabled">
            <div class="select-selection input" (click)="toggleOpen($event)">
                <span class="selection-item"
                      [ngClass]="m._itemClass"
                      [ngStyle]="m._itemStyle"
                      (click)="remove(m, $event)"
                      *ngFor="let m of selectedItems">
                    <span class="selection-item-text">{{m | localizedName:textKey}}</span>
                    <span class="selection-item-description" *ngIf="descriptionKey">{{m[descriptionKey]}}</span>
                </span>
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
                <span class="placeholder">{{placeHolder}}</span>
                <span class="select-clear" (click)="clear($event)">&times;</span>
                <div class="select-search-not-found" *ngIf="showNotFound && notFoundText">{{notFoundText}}</div>
            </div>
            <div class="select-dropdown">
                <ul class="select-list scroll-shadow" (scroll)="onScroll($event)">
                    <li class="select-option"
                          [class.selected]="selectedItemIds.indexOf(m[idKey]) !== -1"
                          [class.focus]="cursorId === m[idKey]"
                          (click)="add(m)"
                          *ngFor="let m of _items">
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
    @HostBinding('tabIndex') get _tabIndex() { return -1; /* this.tabIndex; */ }

    @HostListener('focus', ['$event']) public onFocus($event: MouseEvent): void {
        if (this.disabled) {
            return;
        }

        this.isFocused = true;
        // this.renderer.invokeElementMethod(this.searchInput.nativeElement, 'focus');
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
    }

    @HostListener('keydown', ['$event']) public onKeyDown($event: KeyboardEvent): void {
        if (this.disabled) {
            return;
        }

        this.handleEvent($event);
    }

    @Input('items') set __items(items: any) {
        this.items = items;
        this._items = items;
    };
    @Input() selectedItems: any = [];
    @Input() idKey: string = 'id';
    @Input() textKey: string = 'name';
    @Input() descriptionKey: string;
    @Input() multiple = false;
    @Input() disabled = false;
    @Input() allowClear = false;
    @Input() searchable = false;
    @Input() contentLoadable = false;
    @Input() tabIndex = 0;
    @Input() checkmarkIconClass = 'fa fa-check';
    @Input() placeHolder: string = '';
    @Input() notFoundText: string = 'Not found';

    @Output() load = new EventEmitter<any>();
    @Output() change = new EventEmitter<any>();

    @ViewChild('searchInput') searchInput: ElementRef;

    private documentClickListener;
    private documentKeyUpListener;
    private items: any = [];
    private _items: any = [];
    private selectedItemIds: string[] = [];
    private isOpen = false;
    private isFocused = false;
    private selfClick = false;
    private firstOpen = true;
    private keyWord = '';
    private showNotFound = false;

    private SEARCH_MODE = 0;
    private MOVE_MODE = 1;
    private cursorMode = 1;
    private cursorId;
    private cursorPosition = -1;

    constructor(private renderer: Renderer) { }

    ngOnInit() {
        if (this.disabled) {
            return;
        }

        if (this.multiple) {
            this.filterItems();
        }

        this.resetCursor();
        this.checkSelected();
    }

    ngOnDestroy() {
        this.close();
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
    }

    clear($event) {
        if (this.selectedItemIds.length || this.selectedItems.length) {
            $event.stopPropagation();
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

    filterItems(keyWord?: string) {
        if (!this.contentLoadable && keyWord) {
            this._items = this.items.filter(it => {
                return it[this.textKey].toLowerCase().indexOf(keyWord) != -1;
            });
        } else if (this.multiple) {
            this._items = this.items.filter(it => {
                return this.selectedItemIds.indexOf(it[this.idKey]) == -1;
            });
        } else {
            this._items = this.items;
        }

        if (this._items.length === 0 || this._items.length !== this.items.length) {
            this.resetCursor();
        }

        this.selectFirst();
    }

    search(keyWord) {
        if (this.keyWord !== keyWord) {
            if (this.contentLoadable) {
                this.load.emit({ search: keyWord });
            } else {
                this.filterItems(keyWord);
            }
            this.keyWord = keyWord;
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
                    this.cursorPosition = this._items.length - 1;
                } else {
                    this.cursorPosition--;
                    if (this.cursorPosition < 0) {
                        this.cursorPosition = this._items.length - 1;
                    }
                }
                break;
            case 'ArrowDown':
                if (this.cursorPosition === -1) {
                    this.cursorPosition = 0;
                } else {
                    this.cursorPosition++;
                    if (this.cursorPosition >= this._items.length) {
                        this.cursorPosition = 0;
                    }
                }
                break;
            case 'ArrowLeft':
                this.cursorPosition = 0;
                break;
            case 'ArrowRight':
                this.cursorPosition = this._items.length - 1;
                break;
            default:
                return;
        }

        this.cursorId = this._items[this.cursorPosition][this.idKey];
    }

    canMove() {
        return this.isOpen && this._items.length > 0;
    }

    addOnCursor() {
        this.add(this._items[this.cursorPosition]);
    }

    resetCursor() {
        this.cursorId = null;
        this.cursorPosition = -1;
        this.cursorMode = this.MOVE_MODE;
    }

    selectFirst() {
        if (this.cursorMode === this.SEARCH_MODE && this._items.length > 0) {
            this.cursorId = this._items[0].id;
            this.cursorPosition = 0;
            this.cursorMode = this.MOVE_MODE;
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
            this.load.emit({ first: true });
            this.firstOpen = false;
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
            this.load.emit({ next: true });
        }
    }
}
