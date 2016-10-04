import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'tree-indentation',
    template: `
        <i class="tree-indentation_indent"
            [class.has-sibling]="_level == '1'"
            [class.is-last]="isLast"
            *ngFor="let _level of levels; let isLast = last;">
        </i><i class="tree-indentation_icon fa"></i>
        <span class="tree-indentation_content"><ng-content></ng-content></span>
    `,
    host: {
        '[class.tree-indentation]': 'true',
        '[class.is-expandable]': 'expandable',
        '[class.is-expanded]': 'expanded',
        '(click)': 'onClick($event)'
    }
})

export class TreeIndentationComponent {
    @Input() expandable: boolean = false;
    @Input() expanded: boolean = false;
    @Input('level') set _levels(levels: string) {
        this.levels = levels ? levels.split('') : [];
    };
    @Output() toggle = new EventEmitter();

    private levels = [];

    onClick($event) {
        if (this.expandable) {
            $event.preventDefault();
            $event.stopPropagation();
            this.toggle.emit($event);
        }
    }
}
