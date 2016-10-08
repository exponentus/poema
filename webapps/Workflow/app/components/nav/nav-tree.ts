import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[nb-nav-tree]',
    templateUrl: './nav-tree.html'
})

export class NavTreeComponent {
    @Input() entries = [];
    @Input() rootSegment = '/';
    @Input() expandedEntryIds = [];
    @Output() toggle = new EventEmitter();

    constructor(
        private router: Router
    ) { }

    isActive(instruction: any[]): boolean {
        return this.router.isActive(this.router.createUrlTree(instruction), true);
    }

    toggleCollapsible(id, $event) {
        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }
        this.toggle.emit(id);
    }
}
