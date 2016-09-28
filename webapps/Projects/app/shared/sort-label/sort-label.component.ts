import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sort-label',
    template: `
        <ng-content></ng-content>
    `,
    host: {
        '[class.sort-label]': 'true',
        '[class.asc]': 'isAsc',
        '[class.desc]': 'isDesc',
        '[class.both]': 'isBoth'
    }
})

export class SortLabelComponent {
    @Input() direction: string;
    @Input() current: string;

    @Output() sort = new EventEmitter();
}
