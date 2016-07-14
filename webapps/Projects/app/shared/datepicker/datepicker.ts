import { Directive, Input, Output, ElementRef, OnInit, OnDestroy, EventEmitter } from '@angular/core';

const Pikaday = require('pikaday');

@Directive({
    selector: '[datepicker]'
})

export class DatepickerDirective {
    @Input() format: string = 'DD.MM.YYYY HH:mm';
    @Output() select = new EventEmitter<any>();
    private picker;

    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
        this.picker = new Pikaday({
            field: this.elementRef.nativeElement,
            format: this.format,
            onSelect: () => {
                // this.elementRef.nativeElement.change();
                this.select.emit(this.picker.toString(this.format));
            }
        });
    }

    ngOnDestroy() {
        this.picker.destroy();
    }
}
