import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../../actions';
import { NotificationService } from '../../../../shared/notification';
import { WorkflowIncomingService } from '../../services';

@Component({
    selector: 'incoming-form',
    templateUrl: './incoming-form.html'
})

export class IncomingFormComponent {
    private subs: any = [];
    isReady = false;
    isNew = true;
    isEditable = false;
    isValid = true;
    title: 'incoming';
    incoming: any;
    projectStatusTypes: any;
    actions: any = {};
    errors: any = {};
    redirectUrl: any;

    constructor(
        private store: Store<any>,
        private router: Router,
        private route: ActivatedRoute,
        private environmentActions: EnvironmentActions,
        private incomingService: WorkflowIncomingService,
        private notifyService: NotificationService
    ) { }

    ngOnInit() {
        this.subs.push(this.route.params.subscribe(params => {
            let id = this.router.routerState.snapshot.root.queryParams['docid'] || undefined;
            this.loadIncoming(id);
        }));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    // ===
    loadIncoming(id: string) {
        this.incomingService.fetchIncomingById(id).subscribe(
            ({incoming, actions}) => {
                this.incoming = incoming;
                this.actions = actions || {};
                this.isNew = this.incoming.id == '';
                this.isEditable = this.isNew || this.incoming.editable;
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
