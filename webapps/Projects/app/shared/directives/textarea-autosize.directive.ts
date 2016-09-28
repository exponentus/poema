import { Directive, Input, AfterContentInit, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'textarea[autosize]'
})

export class TextareaAutoSizeDirective {

    @HostListener('input', ['$event.target']) onInput(textArea: HTMLTextAreaElement): void {
        this.resize();
    }

    @Input('rows') set _minRows(rows: number) {
        if (+rows > 0) this.minRows = +rows;
    }

    private el: HTMLTextAreaElement;
    private minRows: number = 3;

    constructor(private element: ElementRef) {
        this.el = this.element.nativeElement;
    }

    ngAfterContentInit() {
        setTimeout(() => { this.resize(); }, 0);
    }

    resize() {
        let lineHeight = parseFloat(window.getComputedStyle(this.el, null).getPropertyValue('line-height'));
        this.el.rows = this.minRows;
        let rows = Math.ceil((this.el.scrollHeight - this.el.offsetHeight) / lineHeight);
        this.el.rows = this.minRows + rows;
    }
}
