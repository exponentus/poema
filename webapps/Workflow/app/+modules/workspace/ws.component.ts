import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../actions';
import { WorkspaceService } from './ws.service';

@Component({
    selector: 'WorkSpaceComponent',
    template: '<h1>Workspace component</h1>'
})

export class WorkspaceComponent {
    private subs: any = [];
    isReady = false;

    constructor(
        private store: Store<any>,
        private environmentActions: EnvironmentActions,
        private wsService: WorkspaceService
    ) { }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }
}
