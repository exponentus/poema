import { Component, ContentChildren, Input, QueryList, AfterContentInit } from '@angular/core';

import { Tab } from './tab';

@Component({
    selector: 'tabs',
    template: `
        <ul class="nav nav-tabs" *ngIf="!(hideTabBarIfOne && tabs.length === 1)">
            <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.pinned]="tab.pinned" [class.active]="tab.active">
                <a href="#" (click)="$event.preventDefault()">
                    <i class="{{tab.icon}}" *ngIf="tab.icon"></i>
                    <span>{{tab.title}}</span>
                </a>
            </li>
        </ul>
        <ng-content></ng-content>
    `
})

export class Tabs implements AfterContentInit {
    @Input() hideTabBarIfOne: boolean = true;
    @ContentChildren(Tab) tabs: QueryList<Tab>;

    ngAfterContentInit() {
        let activeTabs = this.tabs.filter(tab => tab.active);

        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }

    selectTab(tab: Tab) {
        this.tabs.forEach(tab => tab.active = false);
        tab.active = true;
        tab.select.emit(true)
    }
}
