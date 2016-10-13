import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../actions';
import { WorkspaceService } from './ws.service';

@Component({
    selector: 'WorkSpaceComponent',
    template: `
        <main class="content">
            <h1>WorkSpaceComponent</h1>
                <div class="span4" *ngFor="let opt of options">
                    <selection
                        class="employee-input"
                        [contentUrl]="opt.contentUrl"
                        [contentPath]="opt.contentPath"
                        [totalPagesPath]="opt.totalPagesPath"
                        [disabled]="false"
                        [searchable]="true"
                        [allowClear]="true"
                        [multiple]="opt.multiple"
                        placeHolder="place holder"
                        (change)="onSelect($event)">
                    </selection>
                </div>
            <router-outlet></router-outlet>
        </main>
    `
})

export class WorkspaceComponent {

    options = [
        {
            contentUrl: "/Reference/p?id=tag-view",
            contentPath: "objects.1.list",
            totalPagesPath: "objects.1.meta.totalPages",
            multiple: true
        },
        {
            contentUrl: "/Reference/p?id=tasktypes",
            contentPath: "objects.0.list",
            totalPagesPath: "objects.0.meta.totalPages",
            multiple: false
        },
        {
            contentUrl: "/Staff/p?id=employees",
            contentPath: "objects.0.list",
            totalPagesPath: "objects.0.meta.totalPages",
            multiple: false
        },
        {
            contentUrl: "/Reference/p?id=region-view",
            contentPath: "objects.1.list",
            totalPagesPath: "objects.1.meta.totalPages",
            multiple: false
        },
        {
            contentUrl: "/Staff/p?id=role-view",
            contentPath: "objects.1.list",
            totalPagesPath: "objects.1.meta.totalPages",
            multiple: false
        },
        {
            contentUrl: "/Reference/p?id=country-view",
            contentPath: "objects.1.list",
            totalPagesPath: "objects.1.meta.totalPages",
            multiple: false
        },
        {
            contentUrl: "/Reference/p?id=citydistrict-view",
            contentPath: "objects.1.list",
            totalPagesPath: "objects.1.meta.totalPages",
            multiple: false
        }
    ];

    constructor(
        private store: Store<any>,
        private environmentActions: EnvironmentActions,
        private wsService: WorkspaceService
    ) {
        this.store.dispatch(environmentActions.setCurrentModule('Workspace'));
    }

    onSelect($event) {
        console.log('select', $event);
    }
}
