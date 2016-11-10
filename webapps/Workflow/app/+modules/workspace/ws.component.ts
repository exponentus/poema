import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../actions';
import { IEnvironmentState } from '../../reducers';
import { WorkspaceService } from './ws.service';
import { App } from './app.model';

@Component({
    selector: 'WorkSpaceComponent',
    template: `
        <main class="content">
            <section class="ws">
                <section class="ws-apps">
                    <div class="container">
                        <div class="ws-app" *ngFor="let app of apps">
                            <a *ngIf="app.interfaceType === 'SPA'" class="ws-app-link"
                                  [routerLink]="['/' + app.name + (app.defaultPage != 'index' ? '/' + app.defaultPage : '')]">
                                <span class="ws-app-logo">
                                    <img class="ws-app-logo" src="/{{app.name}}/img/logo.png" [alt]="app.name" />
                                </span>
                                <span class="ws-app-type">{{app.name}}</span>
                                <span class="ws-app-name">{{app | localizedName}}</span>
                            </a>
                            <a *ngIf="app.interfaceType != 'SPA'" class="ws-app-link" [href]="'/' + app.name + '?id=' + app.defaultPage">
                                <span class="ws-app-logo">
                                    <img class="ws-app-logo" src="/{{app.name}}/img/logo.png" [alt]="app.name" />
                                </span>
                                <span class="ws-app-type">{{app.name}}</span>
                                <span class="ws-app-name">{{app | localizedName}}</span>
                            </a>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    `
})

export class WorkspaceComponent {
    private apps: App[] = [];
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
