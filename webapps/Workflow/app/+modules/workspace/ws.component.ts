import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../actions';
import { WorkspaceService } from './ws.service';

@Component({
    selector: 'WorkSpaceComponent',
    template: `
        <main class="content">
            <h1>WorkSpaceComponent</h1>
            <router-outlet></router-outlet>
        </main>
    `
})

export class WorkspaceComponent {

    constructor(
        private store: Store<any>,
        private environmentActions: EnvironmentActions,
        private wsService: WorkspaceService
    ) {
        this.store.dispatch(environmentActions.setCurrentModule('Workspace'));
    }
}
