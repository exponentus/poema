import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../../actions';

@Component({
    selector: 'reference-index',
    template: '<h1>reference-index</h1>'
})

export class ReferenceIndexComponent {

    constructor(
        private store: Store<any>,
        private environmentActions: EnvironmentActions
    ) { }

    ngOnInit() {
        this.store.dispatch(this.environmentActions.setNavUrl('/reference/view', '/Reference/p?id=outline'));
    }
}
