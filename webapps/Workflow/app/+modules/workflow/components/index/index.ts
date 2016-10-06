import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../../actions';

@Component({
    selector: 'workflow-index',
    template: '<h1>workflow-index</h1>'
})

export class WorkflowIndexComponent {

    private subs: any = [];

    constructor(
        private store: Store<any>,
        private environmentActions: EnvironmentActions
    ) { }

    ngOnInit() {
        this.store.dispatch(this.environmentActions.setNavUrl('', '/Workflow/p?id=outline'));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }
}
