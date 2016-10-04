import {
    Component,
    Input,
    Output,
    HostBinding,
    HostListener,
    Renderer,
    AfterContentInit,
    OnDestroy,
    ContentChildren,
    EventEmitter,
    QueryList
} from '@angular/core';

import { DropdownToggleComponent } from './dropdown-toggle.component';

@Component({
    selector: '[dropdown]',
    template: `<ng-content></ng-content>`
})

export class DropdownComponent {
    @HostBinding('class.dropdown') true;
    @HostBinding('class.open') get isOpen() { return this.open; };
    @HostBinding('class.focus') get isFocused() { return this.focused; };
    @HostBinding('tabIndex') get _tabIndex() { return this.tabIndex; };

    @HostListener('mouseenter', ['$event']) public onMouseEnter($event: MouseEvent): void {
        if (this.mouseEvent) {
            clearTimeout(this.time);
            this.time = setTimeout(() => this.open = true, this.delay);
        }
    }

    @HostListener('mouseleave', ['$event']) public onMouseLeave($event: MouseEvent): void {
        if (this.mouseEvent) {
            clearTimeout(this.time);
            this.time = setTimeout(() => this.open = false, this.delay);
        }
    }

    @HostListener('click', ['$event']) public onClick($event: MouseEvent): void {
        this.selfClick = true;
    }

    @HostListener('focus', ['$event']) public onFocus($event: MouseEvent): void {
        $event.preventDefault();
        this.focused = true;
    }

    @HostListener('blur', ['$event']) public onBlur($event: MouseEvent): void {
        $event.preventDefault();
        this.focused = false;
        this.open = false;
    }

    @HostListener('keydown', ['$event']) public onKeyDown($event: KeyboardEvent): void {
        if ($event.key === 'Enter') {
            this.open = true;
        } else if ($event.key === 'ArrowUp') {
            console.log('ArrowUp');
        } else if ($event.key === 'ArrowDown') {
            console.log('ArrowDown');
        }
    }

    @ContentChildren(DropdownToggleComponent) toggleComponent: QueryList<DropdownToggleComponent>;
    @Input() open = false;
    @Input() mouseEvent = false;
    @Input() tabIndex = 0;
    @Output() dropdownToggle = new EventEmitter<any>();
    private documentClickListener;
    private documentKeyupListener;
    private selfClick: boolean = false;
    private focused: boolean = false;
    private time;
    private delay = 500;

    constructor(private renderer: Renderer) {
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            if (!this.selfClick) {
                this.open = false;
            } else {
                this.selfClick = false;
            }
        });

        this.documentKeyupListener = this.renderer.listenGlobal('body', 'keyup', (event) => {
            if (event.code === 'Escape') {
                this.open = false;
            }
        });
    }

    ngAfterContentInit() {
        this.toggleComponent.forEach(it => it.toggle.subscribe(event => {
            this.toggleDropdown(event);
        }));
    }

    ngOnDestroy() {
        this.documentClickListener();
        this.documentKeyupListener();
    }

    toggleDropdown(event) {
        event.preventDefault();
        this.open = !this.open;
        this.dropdownToggle.emit(this.open);
    }
}
