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
                    [url]="opt.url"
                    [listPath]="opt.listPath"
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
        // {
        //     url: "/Reference/p?id=tag-view",
        //     listPath: "objects.1.list",
        //     totalPagesPath: "objects.1.meta.totalPages",
        //     multiple: true
        // },
        // {
        //     url: "/Reference/p?id=tasktypes",
        //     listPath: "objects.0.list",
        //     totalPagesPath: "objects.0.meta.totalPages",
        //     multiple: false
        // },
        // {
        //     url: "/Staff/p?id=employees",
        //     listPath: "objects.0.list",
        //     totalPagesPath: "objects.0.meta.totalPages",
        //     multiple: false
        // },
        // {
        //     url: "/Reference/p?id=region-view",
        //     listPath: "objects.1.list",
        //     totalPagesPath: "objects.1.meta.totalPages",
        //     multiple: false
        // },
        // {
        //     url: "/Staff/p?id=role-view",
        //     listPath: "objects.1.list",
        //     totalPagesPath: "objects.1.meta.totalPages",
        //     multiple: false
        // },
        // {
        //     url: "/Reference/p?id=country-view",
        //     listPath: "objects.1.list",
        //     totalPagesPath: "objects.1.meta.totalPages",
        //     multiple: false
        // },
        // {
        //     url: "/Reference/p?id=citydistrict-view",
        //     listPath: "objects.1.list",
        //     totalPagesPath: "objects.1.meta.totalPages",
        //     multiple: false
        // }
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
