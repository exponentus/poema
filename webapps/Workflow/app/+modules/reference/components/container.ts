import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../actions';

@Component({
    selector: 'reference-container',
    template: `
        <link rel="stylesheet" href="/Reference/css/all.min.css" />
        <nav class="aside side-nav"
            nb-nav
            module="Reference"
            outlineUrl="/Reference/p?id=outline">
        </nav>
        <main class="content">
            <router-outlet></router-outlet>
        </main>
    `
})

export class ReferenceContainerComponent {

    constructor(
        private store: Store<any>,
        private environmentActions: EnvironmentActions
    ) {
        this.store.dispatch(environmentActions.setCurrentModule('Reference'));
    }
}
