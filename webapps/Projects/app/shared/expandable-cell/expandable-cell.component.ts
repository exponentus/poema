import { Component, Input } from '@angular/core';

@Component({
    selector: 'expandable-cell',
    template: `
        <i class="expandable-cell_indent"
            [class.is-last]="isLast"
            [class.has-next-expandable]="nextExpandable"
            *ngFor="let _level of counter(level); let isLast = last">
        </i><i class="expandable-cell_icon fa"></i>
        <span class="expandable-cell_content"><ng-content></ng-content></span>
    `,
    host: {
        '[class.expandable-cell]': 'true',
        '[class.is-expandable]': 'expandable',
        '[class.is-expanded]': 'expanded',
        '[class.is-loading]': 'loading',
        '[class.is-last]': 'isLast'
    }
})

export class ExpandableCellComponent {
    @Input() expandable: boolean = false;
    @Input() expanded: boolean = false;
    @Input() loading: boolean = false;
    @Input() level: number = 0;
    @Input() isLast: boolean = false;
    @Input() nextExpandable: boolean = false;

    private counter = Array;
}
