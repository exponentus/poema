import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'expandable-cell',
    template: `
        <i class="expandable-cell_indent"
            [class.is-last]="isLast"
            [class.has-next-expandable]="nextExpandable"
            *ngFor="let _level of counter(level); let isLast = last">
        </i>
        <i class="expandable-cell_icon fa"></i>
        <span><ng-content></ng-content></span>
    `,
    host: {
        '[class.expandable-cell]': 'true',
        '[class.is-expandable]': 'expandable',
        '[class.is-expanded]': 'expanded',
        '[class.is-last]': 'isLast',
        '(click)': 'onClick($event)'
    }
})

export class ExpandableCellComponent {
    @Input() expandable: boolean = false;
    @Input() expanded: boolean = false;
    @Input() level: number = 0;
    @Input() isLast: boolean = false;
    @Input() nextExpandable: boolean = false;
    @Output() toggle = new EventEmitter<any>();

    private counter = Array;

    constructor() { }

    onClick($event) {
        this.toggle.emit(!this.expanded);
    }
}
