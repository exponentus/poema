import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../actions';

@Component({
    selector: 'projects-container',
    template: `
        <link rel="stylesheet" href="/Projects/css/all.min.css" />
        <nav class="aside side-nav" projects-nav></nav>
        <main class="content">
            <router-outlet></router-outlet>
        </main>
    `
})

export class ProjectsContainerComponent {

    constructor(
        private store: Store<any>,
        private environmentActions: EnvironmentActions
    ) {
        this.store.dispatch(environmentActions.setCurrentModule('Projects'));
    }
}
