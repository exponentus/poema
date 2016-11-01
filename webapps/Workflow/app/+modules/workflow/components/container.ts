import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../actions';

@Component({
    selector: 'workflow-container',
    template: `
        <link rel="stylesheet" href="/Workflow/css/all.min.css" />
        <nav class="aside side-nav"
            nb-nav
            module="Workflow"
            outlineUrl="/Workflow/p?id=outline">
        </nav>
        <main class="content">
            <router-outlet></router-outlet>
        </main>
    `
})

export class WorkflowContainerComponent {

    constructor(
        private store: Store<any>,
        private environmentActions: EnvironmentActions
    ) {
        this.store.dispatch(environmentActions.setCurrentModule('Workflow'));
    }
}
