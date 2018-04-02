import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import {
    IApiOutcome, IAction,
    AppService, ActionService, SignService,
    NotificationService, NbModalService,
    AbstractFormPage, tagStylerFn,
    STAFF_URL, REFERENCE_URL
} from '@nb/core';

import { WF_URL } from '../../constants';
import { OutgoingService } from '../../services';
import { Outgoing } from '../../models';

@Component({
    selector: 'wf-outgoing-form',
    templateUrl: './outgoing-form.html',
    host: {
        '[class.component]': 'true',
        '[class.load]': 'loading'
    },
    providers: [OutgoingService]
})
export class OutgoingFormComponent extends AbstractFormPage<Outgoing> {

    STAFF_URL = STAFF_URL;
    REFERENCE_URL = REFERENCE_URL;
    tagStylerFn = tagStylerFn;
    flag: { [key: string]: boolean }; // approvalProcessingBlockRequireCommentIfNo

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public ngxTranslate: TranslateService,
        public notifyService: NotificationService,
        public nbModalService: NbModalService,
        public appService: AppService,
        public actionService: ActionService,
        public entityService: OutgoingService,
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
                super.onAction(action, { target: Outgoing.convertToDto(<Outgoing>this.model) });
                break;
            case 'declineApprovalBlock':
                this.handleDeclineApprovalBlock(action);
                break;
            case 'sign':
                this.nbSignService.sign(Outgoing.convertToSignData(<Outgoing>this.model), (signature) => {
                    this.model.signature = signature;
                });
                break;
            default:
                super.onAction(action);
                break;
        }
    }

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
                            target: <Outgoing>{ id: this.model.id },
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
