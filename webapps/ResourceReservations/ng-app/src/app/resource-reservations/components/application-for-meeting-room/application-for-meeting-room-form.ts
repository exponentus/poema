import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import {
    IApiOutcome, IAction, IFormSchema,
    AppService, ActionService, NotificationService, NbModalService,
    AbstractFormPage, tagStylerFn,
    STAFF_URL, REFERENCE_URL
} from '@nb/core';

import { ApplicationForMeetingRoomService } from '../../services/application-for-meeting-room.service';
import { RR_URL } from '../../constants';
import { ApplicationForMeetingRoom } from '../../models';

@Component({
    selector: 'rr-application-for-meeting-room-form',
    templateUrl: './application-for-meeting-room-form.html',
    host: {
        '[class.component]': 'true',
        '[class.load]': 'loading'
    }
})
export class ApplicationForMeetingRoomFormComponent extends AbstractFormPage<ApplicationForMeetingRoom> {

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
        public entityService: ApplicationForMeetingRoomService
    ) {
        super(route, router, ngxTranslate, notifyService, nbModalService, appService, actionService, entityService);
    }

    // @Override
    onLoadDataSuccess(data: IApiOutcome) {
        super.onLoadDataSuccess(data);
        this.flag = data.payload.flag;
        this.model.author = data.payload.employees[this.model.authorId];
        if (this.model.blocks) {
            // this.model.blocks = this.model.blocks.sort((a, b) => a.position > b.position ? 1 : -1);
            this.model.blocks.forEach(itblock => {
                // if (itblock.approvers) {
                //     itblock.approvers = itblock.approvers.sort((a, b) => a.position > b.position ? 1 : -1);
                // }
                if (!itblock.id) {
                    itblock.tid = '' + Date.now();
                }
            });
        }
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
            case 'declineApprovalBlock':
                this.handleDeclineApprovalBlock(action);
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
                        placeholder: 'comment',
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
                            target: <ApplicationForMeetingRoom>{ id: this.model.id },
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
