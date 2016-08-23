import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
    selector: '[autofocus]'
})

export class AutofocusDirective {
    constructor(private element: ElementRef) { }

    ngOnInit() {
        this.element.nativeElement.focus();
    }
}
