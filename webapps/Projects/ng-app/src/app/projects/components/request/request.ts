import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import {
    IApiOutcome, IAction, IActionPayload,
    AppService, ActionService, NotificationService,
    NbModalService, NbModal, AbstractFormPage,
    DATE_TIME_FORMAT, mdFormat, REFERENCE_URL
} from '@nb/core';

import { RequestService } from '../../services/request.service';
import { Task, Request } from '../../models';

@Component({
    selector: 'request',
    templateUrl: './request.html',
    host: {
        '[class.component]': 'true',
        '[class.load]': 'loading'
    }
})
export class RequestComponent extends AbstractFormPage<Request> {

    REFERENCE_URL = REFERENCE_URL;
    modals: NbModal[] = [];

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public ngxTranslate: TranslateService,
        public notifyService: NotificationService,
        public nbModalService: NbModalService,
        public appService: AppService,
        public actionService: ActionService,
        public entityService: RequestService
    ) {
        super(route, router, ngxTranslate, notifyService, nbModalService, appService, actionService, entityService);
    }

    get canResolution() {
        return this.actions.filter(it => (it.customID === 'accept')).length;
    }

    onLoadDataSuccess(data: IApiOutcome) {
        super.onLoadDataSuccess(data);

        let emps = data.payload.employees;
        if (this.model.authorId) {
            this.model.author = emps[this.model.authorId];
        }
        this.model.task = data.payload.task;
    }

    // ngOnDestroy() {
    //     super.ngOnDestroy();
    //     this.modals.map(m => m.close());
    // }

    onAction(action: IAction) {
        switch (action.customID) {
            case 'accept':
                if (this.model.resolution === 'UNKNOWN' && this.model.requestType.name === 'prolong') {
                    this.openAcceptProlongDialog(action);
                } else {
                    this.doAccept(action, {
                        target: <Request>{ id: this.model.id },
                        payload: null
                    });
                }
                break;
            case 'decline':
                this.openDeclineDialog(action);
                break;
            default:
                super.onAction(action);
                break;
        }
    }

    doAccept(action: IAction, payload: IActionPayload<Request, String>) {
        this.actionService.doAction(action, this.entityService, payload, {
            success: () => { this.close(); },
            error: () => { }
        }).subscribe();
    }

    doDecline(action: IAction, payload: IActionPayload<Request, String>) {
        this.actionService.doAction(action, this.entityService, payload, {
            success: () => { this.close(); },
            error: () => { }
        }).subscribe();
    }

    openAcceptProlongDialog(action: IAction) {
        let dlg = {
            type: 'dialog',
            title: 'due_date',
            className: 'nb-modal-sm',
            model: {
                editable: true,
                dueDate: null
            },
            formSchema: [{
                tabTitle: 'properties',
                fieldsets: [{
                    className: 'vertical',
                    fields: [{
                        type: 'date',
                        name: 'dueDate',
                        label: 'new_due_date_help',
                        className: 'span6'
                    }]
                }]
            }],
            buttons: [{
                label: 'cancel',
                click: (modal: any, event: any) => { modal.close(); }
            }, {
                label: 'accept',
                className: 'btn-primary',
                click: (modal: any, event: any) => {
                    if (modal.model.dueDate) {
                        this.doAccept(action, {
                            target: <Request>{ id: this.model.id },
                            payload: mdFormat(modal.model.dueDate, DATE_TIME_FORMAT)
                        });
                        modal.close();
                    }
                }
            }]
        };

        this.modals.push(this.nbModalService.create(dlg).show());
    }

    openDeclineDialog(action: IAction) {
        let dlg = {
            type: 'dialog',
            title: 'decline',
            model: {
                editable: true
            },
            formSchema: [{
                tabTitle: 'properties',
                fieldsets: [{
                    fields: [{
                        type: 'textarea',
                        hideLabel: true,
                        name: 'comment',
                        placeholder: 'decline_reason',
                        className: 'span7',
                        required: true
                    }]
                }]
            }],
            buttons: [{
                label: 'cancel',
                click: (modal: any, event: any) => { modal.close(); }
            }, {
                label: 'decline',
                className: 'btn-primary',
                click: (modal: any, event: any) => {
                    this.doDecline(action, {
                        target: <Request>{ id: this.model.id },
                        payload: modal.model.comment
                    });
                    modal.close();
                }
            }]
        };

        this.modals.push(this.nbModalService.create(dlg).show());
    }
}
