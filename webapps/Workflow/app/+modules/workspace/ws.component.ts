import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../actions';
import { IEnvironmentState } from '../../reducers';
import { WorkspaceService } from './ws.service';

@Component({
    selector: 'WorkSpaceComponent',
    template: `
        <main class="content">
            <section class="ws">
                <section class="ws-apps">
                    <div class="container">
                        <div class="ws-app" *ngFor="let app of apps">
                            <a class="ws-app-link" [routerLink]="[app.url]">
                                <span class="ws-app-logo">
                                    <img class="ws-app-logo" src="/{{app.id}}/img/logo.png" alt="logo" />
                                </span>
                                <span class="ws-app-type">{{app.id}}</span>
                                <span class="ws-app-name">{{app.name}}</span>
                            </a>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    `
})

export class WorkspaceComponent {
    private apps: any = [];
    private subs: any = [];

    constructor(
        private store: Store<any>,
        private environmentActions: EnvironmentActions,
        private wsService: WorkspaceService
    ) {
        this.store.dispatch(environmentActions.setCurrentModule('Workspace'));

        this.subs.push(this.store.select('environment').subscribe((state: IEnvironmentState) => {
            this.apps = state.apps;
        }));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }
}
