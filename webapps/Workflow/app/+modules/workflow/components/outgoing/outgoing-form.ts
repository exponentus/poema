import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../../actions';
import { NotificationService } from '../../../../shared/notification';
import { WorkflowOutgoingService } from '../../services/outgoing.service';

@Component({
    selector: 'outgoing-form',
    templateUrl: './outgoing-form.html'
})

export class OutgoingFormComponent {
    private subs: any = [];
    isReady = false;
    isNew = true;
    isEditable = false;
    isValid = true;
    outgoing: any;
    projectStatusTypes: any;
    actions: any = {};
    errors: any = {};
    redirectUrl: any;

    constructor(
        private store: Store<any>,
        private router: Router,
        private route: ActivatedRoute,
        private environmentActions: EnvironmentActions,
        private outgoingService: WorkflowOutgoingService,
        private notifyService: NotificationService
    ) { }

    ngOnInit() {
        this.subs.push(this.route.params.subscribe(params => {
            let id = this.router.routerState.snapshot.root.queryParams['id'] || undefined;
            this.loadOutgoing(id);
        }));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    // ===
    loadOutgoing(id: string) {
        this.outgoingService.fetchOutgoingById(id).subscribe(
            ({outgoing, actions}) => {
                this.outgoing = outgoing;
                this.actions = actions || {};
                this.isNew = this.outgoing.id == '';
                this.isEditable = this.isNew || this.outgoing.editable;
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
