import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../actions';

@Component({
    selector: 'staff-container',
    template: `
        <nav class="aside nb-scrollbar side-nav"
            nb-nav
            module="Staff"
            outlineUrl="/Staff/p?id=outline">
        </nav>
        <main class="content">
            <router-outlet></router-outlet>
        </main>
    `
})

export class StaffContainerComponent {

    constructor(
        private store: Store<any>,
        private environmentActions: EnvironmentActions
    ) {
        this.store.dispatch(environmentActions.setCurrentModule('Staff'));
    }
}
