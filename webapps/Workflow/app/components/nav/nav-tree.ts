import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[nb-nav-tree]',
    template: `
        <ul>
            <li *ngFor="let entry of entries">
                <a [routerLink]="[rootSegment, entry.customID]" class="nav-link" [class.active]="isActive([rootSegment, entry.customID])">
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
