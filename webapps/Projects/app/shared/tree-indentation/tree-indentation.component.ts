import { Component, Input } from '@angular/core';

@Component({
    selector: 'tree-indentation',
    template: `
        <i class="tree-indentation_indent"
            [class.has-sibling]="_level == '1'"
            [class.is-last]="isLast"
            *ngFor="let _level of level; let isLast = last;">
        </i><i class="tree-indentation_icon fa"></i>
        <span class="tree-indentation_content"><ng-content></ng-content></span>
    `,
    host: {
        '[class.tree-indentation]': 'true',
        '[class.is-expandable]': 'expandable',
        '[class.is-expanded]': 'expanded',
        '[class.is-last]': 'isLast'
    }
})

export class TreeIndentationComponent {
    @Input() expandable: boolean = false;
    @Input() expanded: boolean = false;
    @Input() isLast: boolean = false;
    @Input('level') set _level(levelTree: string) {
        this.level = levelTree ? levelTree.split('') : [];
    };

    private level = [];
}
