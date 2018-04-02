import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import {
    IApiOutcome, IAction,
    AppService, ActionService, SignService,
    NotificationService, NbModalService,
    AbstractFormPage, STAFF_URL
} from '@nb/core';

import { WF_URL } from '../../constants';
import { OfficeMemoService } from '../../services';
import { OfficeMemo, Approval, Employee } from '../../models';

@Component({
    selector: 'wf-office-memo-form',
    templateUrl: './office-memo-form.html',
    host: {
        '[class.component]': 'true',
        '[class.load]': 'loading'
    },
    providers: [OfficeMemoService]
})
export class OfficeMemoFormComponent extends AbstractFormPage<OfficeMemo> {

    STAFF_URL = STAFF_URL;
    flag: { [key: string]: boolean }; // approvalProcessingBlockRequireCommentIfNo

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public ngxTranslate: TranslateService,
        public notifyService: NotificationService,
        public nbModalService: NbModalService,
        public appService: AppService,
        public actionService: ActionService,
        public entityService: OfficeMemoService,
        private nbSignService: SignService
    ) {
        super(route, router, ngxTranslate, notifyService, nbModalService, appService, actionService, entityService);
    }

    // @Override
    loadDataSuccess(data: IApiOutcome) {
        super.loadDataSuccess(data);
        this.flag = data.payload.flag;
        this.model.author = data.payload.employees[this.model.authorId];
    }

    checkToolbarActions() {
        super.checkToolbarActions();
        this.actions.filter(it => it.customID === 'startApproving').map((action: IAction) => {
            if (!this.model.blocks || this.model.blocks.length === 0) {
                action.hidden = true;
            } else {
                action.hidden = false;
                action.disabled = !this.isValid;
            }
        });
    }

    onAction(action: IAction) {
        switch (action.customID) {
            case 'startApproving':
                // toast - start_approving
                super.onAction(action, { target: OfficeMemo.convertToDto(<OfficeMemo>this.model) });
                break;
            case 'declineApprovalBlock':
                this.handleDeclineApprovalBlock(action);
                break;
            case 'sign':
                this.nbSignService.sign(OfficeMemo.convertToSignData(<OfficeMemo>this.model), (signature) => {
                    this.model.signature = signature;
                });
                break;
            default:
                super.onAction(action);
                break;
        }
    }

    // handleRequestError(error: any = {}) {
    //     let errors = {};

    //     this.officeMemoService.handleMessages({ messages: error.message, isError: true });

    //     if (error.id === 'ERROR_VALIDATION') {
    //         this.isValid = false;
    //         for (let err of error.payload.error.errors) {
    //             errors[err.field] = {
    //                 message: err.message,
    //                 error: err.error
    //             };
    //         }
    ////////////////-------------------------------------------------
    //     } else if (error.type && error.message) {
    //         if (!this.isEditable) {
    //             if (ApprovalExceptionTypes.indexOf(error.type) != -1) {
    //                 this.loadData(this.officeMemo.id, {});
    //             }
    //         }
    //         this.notifyService.error(error.message).show();
    //     }
    ////////////////-------------------------------------------------
    //     this.officeMemoService.errors = errors;

    //     return error;
    // }

    handleDeclineApprovalBlock(action: IAction) {
        if (this.flag.approvalProcessingBlockRequireCommentIfNo) {
            this.openDeclineApprovalBlockDialog(action);
        } else {
            super.onAction(action);
        }
    }

    openDeclineApprovalBlockDialog(action: IAction) {
        let dialog = {
            type: 'dialog',
            title: 'confirm_action',
            model: { editable: true, comment: '' },
            formSchema: [{
                tabTitle: 'properties',
                fieldsets: [{
                    fields: [{
                        type: 'textarea',
                        hideLabel: true,
                        name: 'comment',
                        placeHolder: 'comment',
                        className: 'span7',
                        required: true
                    }]
                }]
            }],
            buttons: [{
                label: 'cancel',
                click: (modal: any, event: any) => {
                    modal.close();
                }
            }, {
                label: 'decline',
                className: 'btn-primary',
                click: (modal: any, event: any) => {
                    if (modal.model.comment && modal.model.comment.trim()) {
                        super.onAction(action, {
                            target: <OfficeMemo>{ id: this.model.id },
                            payload: modal.model.comment.trim()
                        });
                        modal.close();
                    }
                }
            }]
        };

        this.nbModalService.create(dialog).show();
    }
}
