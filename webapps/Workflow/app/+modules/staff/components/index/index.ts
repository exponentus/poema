import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../../actions';

@Component({
    selector: 'staff-index',
    template: '<h1>staff-index</h1>'
})

export class StaffIndexComponent {

    constructor(
        private store: Store<any>,
        private environmentActions: EnvironmentActions
    ) { }

    ngOnInit() {
        this.store.dispatch(this.environmentActions.setNavUrl('/staff', '/Staff/p?id=outline'));
    }
}
