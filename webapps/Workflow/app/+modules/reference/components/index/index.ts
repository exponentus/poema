import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../../actions';

@Component({
    selector: 'reference-index',
    template: '<h1>reference-index</h1>'
})

export class ReferenceIndexComponent {

    private subs: any = [];

    constructor(
        private store: Store<any>,
        private environmentActions: EnvironmentActions
    ) { }

    ngOnInit() {
        this.store.dispatch(this.environmentActions.setNavUrl('/reference/view', '/Reference/p?id=outline'));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }
}
