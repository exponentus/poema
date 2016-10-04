import { Directive, Input, Output, ElementRef, OnInit, OnDestroy, EventEmitter } from '@angular/core';

const Pikaday = require('pikaday');

@Directive({
    selector: '[datepicker]'
})

export class DatepickerDirective {
    @Input() format: string = 'DD.MM.YYYY';
    @Input() minDate: Date;
    @Input() maxDate: Date;
    @Input() yearRange: number = 30;
    @Input() firstDay: number = 1; // 0 = Sunday, 1 = Monday

    @Output() select = new EventEmitter<any>();

    private picker;

    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
        this.picker = new Pikaday({
            field: this.elementRef.nativeElement,
            minDate: this.minDate,
            maxDate: this.maxDate,
            firstDay: this.firstDay,
            yearRange: this.yearRange,
            format: this.format,
            onSelect: () => {
                this.elementRef.nativeElement.value = this.picker.toString();
                this.select.emit(this.picker.toString(this.format));
            }
        });
    }

    ngOnDestroy() {
        this.picker.destroy();
    }
}
