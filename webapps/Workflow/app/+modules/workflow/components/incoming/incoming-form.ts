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
    private isReady = false;
    private isNew = true;
    private isEditable = false;
    private isValid = true;
    private title: 'incoming';
    private incoming: any;

    private actions: any = {};
    private errors: any = {};
    private redirectUrl: any;

    private subs: any = [];

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
            this.loadIncoming(params['incomingId']);
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
