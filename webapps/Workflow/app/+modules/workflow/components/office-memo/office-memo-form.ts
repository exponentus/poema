import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../../actions';
import { NotificationService } from '../../../../shared/notification';
import { WorkflowOfficeMemoService } from '../../services/office-memo.service';

@Component({
    selector: 'office-memo-form',
    templateUrl: './office-memo-form.html'
})

export class OfficeMemoFormComponent {
    private subs: any = [];
    isReady = false;
    isNew = true;
    isEditable = false;
    isValid = true;
    officeMemo: any;
    projectStatusTypes: any;
    actions: any = {};
    errors: any = {};
    redirectUrl: any;

    constructor(
        private store: Store<any>,
        private router: Router,
        private route: ActivatedRoute,
        private environmentActions: EnvironmentActions,
        private officeMemoService: WorkflowOfficeMemoService,
        private notifyService: NotificationService
    ) { }

    ngOnInit() {
        this.subs.push(this.route.params.subscribe(params => {
            let id = this.router.routerState.snapshot.root.queryParams['id'] || undefined;
            this.loadOfficeMemo(id);
        }));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    // ===
    loadOfficeMemo(id: string) {
        this.officeMemoService.fetchOfficeMemoById(id).subscribe(
            ({officeMemo, actions}) => {
                this.officeMemo = officeMemo;
                this.actions = actions || {};
                this.isNew = this.officeMemo.id == '';
                this.isEditable = this.isNew || this.officeMemo.editable;
                this.isReady = true;
                this.isValid = true;
            },
            error => this.handleXhrError(error)
        );
    }

    handleXhrError(errorResponse) {
        this.notifyService.error(errorResponse.message).show().remove(2000);
    }
}
