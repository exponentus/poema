import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[nb-nav-tree]',
    templateUrl: './nav-tree.html'
})

export class NavTreeComponent {
    @Input() entries = [];
    @Input() rootSegment = '/';

    constructor(
        private router: Router
    ) { }

    isActive(instruction: any[]): boolean {
        return this.router.isActive(this.router.createUrlTree(instruction), true);
    }
}
