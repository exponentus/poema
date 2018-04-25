import { Component, } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import {
    IApiOutcome, IAction, IPermissions,
    AppService, ActionService,
    NotificationService, NbModalService,
    AbstractFormPage, LifeCycleNode, tagStylerFn,
    STAFF_URL, REFERENCE_URL
} from '@nb/core';

import { AssignmentService } from '../../services';
import { Assignment } from '../../models';
import { WF_URL } from '../../constants';

@Component({
    selector: 'wf-assignment-form',
    templateUrl: './assignment-form.html',
    host: {
        '[class.component]': 'true',
        '[class.load]': 'loading'
    },
    providers: [AssignmentService]
})
export class AssignmentFormComponent extends AbstractFormPage<Assignment> {

    WF_URL = WF_URL;
    STAFF_URL = STAFF_URL;
    REFERENCE_URL = REFERENCE_URL;
    tagStylerFn = tagStylerFn;

    lifeCycle: LifeCycleNode;
    isHistoryBack = false;
    permissions: IPermissions;

    constructor(
        private location: Location,
        public route: ActivatedRoute,
        public router: Router,
        public ngxTranslate: TranslateService,
        public notifyService: NotificationService,
        public nbModalService: NbModalService,
        public appService: AppService,
        public actionService: ActionService,
        public entityService: AssignmentService
    ) {
        super(route, router, ngxTranslate, notifyService, nbModalService, appService, actionService, entityService);
    }

    // @Override
    onLoadDataSuccess(data: IApiOutcome) {
        super.onLoadDataSuccess(data);
        this.permissions = data.payload.permissions;
        this.model.author = data.payload.employees[this.model.authorId];
        if (this.model.observers) {
            let aobs = this.model.observers;
            let observers = [];
            for (let k in aobs) {
                observers.push(data.payload.employees[aobs[k]]);
            }
            this.model.observers = observers;
        }
    }

    // @Override
    checkToolbarActions() {
        this.actions.map((action: IAction) => {
            if (action.customID === 'save_and_close' || action.customID === 'startImplementation') {
                action.disabled = !this.isValid;
            }
        });
    }

    // @Override
    onAction(action: IAction) {
        if (action.type === 'LINK') {
            this.isHistoryBack = true;
            this.router.navigateByUrl(action.url);
            return;
        }

        switch (action.customID) {
            case 'startImplementation':
                super.onAction(action, { target: Assignment.convertToDto(<Assignment>this.model) });
                break;
            default:
                super.onAction(action);
                break;
        }
    }

    // @Override
    close() {
        if (this.isHistoryBack) {
            this.isHistoryBack = false;
            this.location.back();
        } else {
            this.appService.redirectToRedirectUrl();
        }
    }

    handleControlEvent($e: string) {
        if ($e === 'resetAssignee') {
            this.loadData();
        }
    }

    /*loadAssignment(assignmentId: string, params: any, isReload = false) {
        this.loading = true;

        this.isReady = isReload;
        if (!isReload) {
            this.assignment = null;
            this.acl = {};
            this.actions = [];
            this.assignmentService.errors = {};
        }

        this.assignmentService.fetchById(assignmentId, params).subscribe(
            data => {
                this.appService.setWindowTitle(this.ngxTranslate.instant(data.title));

                this.assignment = data.payload.assignment;
                this.lifeCycle = data.payload.lifecycle;

                this.assignment.apiUrl = `${WF_URL.API_ASSIGNMENTS}/${this.assignment.id}`;
                this.assignment.author = data.payload.employees[this.assignment.authorId];

                this.employees = data.payload.employees;
                //
                this.actions = data.payload.actionbar.actions;
                this.permissions = data.payload.permissions;
                //
                this.acl = data.payload.acl;
                this.fsId = data.payload.fsid;
                this.isNew = this.assignment.id == '';
                this.isEditable = this.isNew || this.assignment.editable;
                this.isReady = true;
                this.isValid = true;
                //
                if (this.assignment.observers) {
                    let aobs = data.payload.assignment.observers;
                    let observers = [];
                    for (let k in aobs) {
                        observers.push(this.employees[aobs[k]]);
                    }
                    this.assignment.observers = observers;
                }
            },
            error => {
                this.assignmentService.handleRequestError(error);
                this.loading = false;
            },
            () => this.loading = false
        );
    }*/
}
