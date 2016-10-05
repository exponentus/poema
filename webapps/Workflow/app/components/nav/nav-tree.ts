import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[nb-nav-tree]',
    template: `
        <ul>
            <li [class.side-tree-collapsible]="entry.entries"
                 *ngFor="let entry of entries">
                <a class="nav-link" [title]="entry.hint"
                     [routerLink]="[rootSegment, entry.customID]"
                     [class.active]="isActive([rootSegment, entry.customID])">
                    <i class="fa fa-file-o"></i>
                    <span>{{entry.caption | translate}}</span>
                </a>
                <nav nb-nav-tree [rootSegment]="rootSegment" [entries]="entry.entries" *ngIf="entry.entries"></nav>
            </li>
        </ul>
    `
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
