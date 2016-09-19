import {
    Component, OnInit, OnDestroy, Input, Output, HostBinding,
    HostListener, Renderer, EventEmitter, ElementRef, ViewChild
} from '@angular/core';

@Component({
    selector: 'selection',
    template: `
        <span class="selection input" *ngIf="disabled">
            <span class="selection-item {{classPrefix}}{{m[classKey]}}" [style.color]="m.color" *ngFor="let m of selectedItems">
                {{m | localizedName:textKey}}
            </span>
        </span>
        <div [ngClass]="classes" *ngIf="!disabled">
            <div class="select-selection input" (click)="toggleOpen($event)">
                <span class="selection-item {{classPrefix}}{{m[classKey]}}"
                      *ngFor="let m of selectedItems"
                      [style.color]="m.color"
                      (click)="remove(m, $event)">
                    {{m | localizedName:textKey}}
                </span>
                <input class="select-search-input"
                    *ngIf="false && searchable"
                    #searchInput
                    name="search"
                    value=""
                    autocomplete="off"
                    (keyup)="handleEvent($event)" />
                <span class="placeholder">{{placeHolder}}</span>
                <span class="select-clear" (click)="clear($event)">&times;</span>
            </div>
            <div class="select-dropdown">
                <ul class="select-list scroll-shadow" (scroll)="onScroll($event)">
                    <li class="select-option" [class.selected]="selectedItemIds.indexOf(m[idKey]) !== -1" *ngFor="let m of _items" (click)="add(m)">
                        <div class="{{classPrefix}}{{m[classKey]}}" [style.color]="m.color">
                            {{m | localizedName:textKey}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    `
})

export class SelectionComponent {
    @HostBinding('tabIndex') get _tabIndex() { return this.tabIndex; }

    @HostListener('focus', ['$event']) public onFocus($event: MouseEvent): void {
        if (this.disabled) {
            return;
        }

        $event.preventDefault();
        this.isFocused = true;
        // this.searchInput.nativeElement.focus();
        // this.renderer.invokeElementMethod(this.searchInput.nativeElement, 'focus');
    }

    @HostListener('blur', ['$event']) public onBlur($event: MouseEvent): void {
        if (this.disabled || this.selfClick) {
            return;
        }

        $event.preventDefault();
        this.close();
        this.clearSearchInput();
    }

    @HostListener('click', ['$event']) public onClick($event: MouseEvent): void {
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
    @Input() classKey: string;
    @Input() classPrefix: string = '';
    @Input() itemStyle: string = '';
    @Input() multiple = false;
    @Input() disabled = false;
    @Input() allowClear = false;
    @Input() searchable = false;
    @Input() contentLoadable = false;
    @Input() tabIndex = 0;
    @Input() placeHolder: string = '';
    @Input() notFoundMessage: string = '';
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
    private mode = { search: true };

    constructor(private renderer: Renderer) { }

    ngOnInit() {
        if (!this.disabled) {
            this.initListenGlobal();
        }
        this.selectedItemIds = this.selectedItems.map(it => it[this.idKey]);
    }

    ngOnDestroy() {
        if (!this.disabled) {
            this.removeListenGlobal();
        }
    }

    // ===
    get classes() {
        return {
            'select': true,
            'selection': true,
            'open': this.isOpen,
            'is-open': this.isOpen,
            'is-focused': this.isFocused,
            'is-multiple': this.multiple,
            'allow-clear': this.isAllowClear,
            'has-selected': this.hasSelected
        };
    }

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
        this.documentClickListener();
        this.documentKeyUpListener();
    }

    // ===
    emitChange() {
        if (this.multiple) {
            this.change.emit(this.selectedItems);
        } else {
            this.change.emit(this.selectedItems[0]);
        }
    }

    add(item) {
        if (this.multiple) {
            this.selectedItems.push(item);
            this.selectedItemIds = this.selectedItems.map(it => it[this.idKey]);
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
        $event.stopPropagation();
        this.selectedItems = [];
        this.selectedItemIds = [];
        this.emitChange();
        this.clearSearchInput();
        this.filterItems();
    }

    clearSearchInput() {
        if (this.searchable && this.searchInput) {
            this.searchInput.nativeElement.value = '';
        }
    }

    filterItems(keyWord?: string) {
        if (!this.contentLoadable && keyWord) {
            this._items = this.items.filter(it => {
                return it[this.textKey].indexOf(keyWord) != -1;
            });
        } else {
            this._items = this.items.filter(it => {
                return this.selectedItemIds.indexOf(it[this.idKey]) == -1;
            });
        }
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

    handleEvent($event) {
        if ($event.key === 'Enter') {
            this.toggleOpen($event);
        } else if ($event.key === 'Escape' || $event.key === 'Tab') {
            this.close();
            this.clearSearchInput();
        } else if ($event.key === 'ArrowUp') {
            // console.log('ArrowUp');
        } else if ($event.key === 'ArrowDown') {
            // console.log('ArrowDown');
        } else if ($event.key === 'ArrowLeft') {
            // console.log('ArrowLeft');
        } else if ($event.key === 'ArrowRight') {
            // console.log('ArrowRight');
        } else if ($event.target.name === 'search') {
            $event.stopPropagation();
            this.search($event.target.value);
        } else {
            console.log($event);
        }
    }

    // ===
    open() {
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
