import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { EnvironmentActions } from '../../../../actions';
import { NotificationService } from '../../../../shared/notification';
import { WorkflowIncomingService } from '../../services';
import { API_URL } from '../../constants/constants';
import { Attachment } from '../../../../models';
import { Incoming, Outgoing } from '../../models';
import { imgToBase64 } from '../../../../utils/utils';

@Component({
    selector: 'incoming-form',
    templateUrl: './incoming-form.html'
})

export class IncomingFormComponent {
    private isReady = false;
    private isNew = true;
    private isEditable = false;
    private isValid = true;
    private incoming: Incoming;
    private fsId: string;

    private actions: any = [];
    private errors: any = {};
    private redirectUrl: any;

    private subs: any = [];

    constructor(
        private store: Store<any>,
        private router: Router,
        private route: ActivatedRoute,
        private translate: TranslateService,
        private environmentActions: EnvironmentActions,
        private incomingService: WorkflowIncomingService,
        private notifyService: NotificationService
    ) { }

    ngOnInit() {
        this.subs.push(this.route.params.subscribe(params => {
            let id = params['id']; // this.router.routerState.snapshot.root.queryParams['docid'] || undefined;
            let fsId = 'fsid';
            this.loadIncoming(id, { fsid: fsId });
        }));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    // ===
    loadIncoming(id: string, params: any) {
        this.incomingService.fetchIncomingById(id, params).subscribe(
            payload => {
                this.incoming = payload.payload.incoming;
                this.incoming.acl = payload.payload.acl;
                this.fsId = payload.payload.fsId;
                this.actions = payload.payload._actionbar.actions || [];
                this.isNew = this.incoming.isNew;
                this.isEditable = this.isNew || this.incoming.editable;
                this.isReady = true;
                this.isValid = true;
                //
                if (this.incoming.attachments) {
                    this.incoming.attachments.map(it => {
                        let url = `${API_URL}incomings/${this.incoming.id}/attachments/${it.id}`;
                        it.url = url;
                        it.thumbnailUrl = it.url + '?_thumbnail';
                    });
                }
            },
            error => this.handleXhrError(error)
        );
    }

    //
    get hasResponses() {
        return this.incoming.responses;
    }

    // actions
    get canSave() {
        return this.actions.filter(it => it.customID === 'save_and_close').length;
    }

    get canDelete() {
        return this.actions.filter(it => it.customID === 'delete_document').length;
    }

    //
    save() {
        let noty = this.notifyService.process(this.translate.instant('wait_while_document_save')).show();
        this.incomingService.saveIncoming(this.incoming, { fsid: this.fsId }).subscribe(
            response => {
                noty.set({ type: 'success', message: response.message }).remove(1500);
                this.close();
            },
            error => {
                noty.remove();
                this.handleXhrError(error);
                this.handleValidationError(error);
            }
        );
    }

    close() {
        // this.router.navigateByUrl(['../']);
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    delete() {
        this.incomingService.deleteIncoming(this.incoming).subscribe(
            data => {
                this.close();
            },
            error => {
                this.handleXhrError(error);
            }
        );
    }

    //
    handleXhrError(errorResponse) {
        this.notifyService.error(errorResponse.message).show().remove(2000);
    }

    handleValidationError(error: any) {
        let errors = {};

        if (error.errors) {
            this.isValid = false;
            for (let err of error.errors) {
                errors[err.field] = {
                    message: err.message,
                    error: err.error
                };
            }
        }

        this.errors = errors;
    }

    //
    setSender(org: any /* Organization */) {
        this.incoming.sender = org;
        this.validateForm();
    }

    setSenderAppliedRegDate(senderAppliedRegDate: Date) {
        this.incoming.senderAppliedRegDate = senderAppliedRegDate;
        this.validateForm();
    }

    setDocLanguage(docLanguage: any) {
        this.incoming.docLanguage = docLanguage;
        this.validateForm();
    }

    setDocType(docType: any) {
        this.incoming.docType = docType;
        this.validateForm();
    }

    setResponseTo(outgoing: Outgoing) {
        this.incoming.responseTo = outgoing;
        this.validateForm();
    }

    setBody(body: string) {
        this.incoming.body = body;
        this.validateForm();
    }

    addAttachment(data) {
        let att: Attachment = new Attachment();
        att.realFileName = data.response.files[0];
        if (!this.incoming.attachments) {
            this.incoming.attachments = [];
        }
        if (!data.files[0].type.match('image.*')) {
            this.incoming.attachments.push(att);
        } else {
            imgToBase64(data.files[0], (e2) => {
                att.base64 = e2.target.result;
                this.incoming.attachments.push(att);
            });
        }
    }

    deleteAttachment(attachment: Attachment) {
        this.incomingService.deleteIncomingAttachment(this.incoming, attachment).subscribe(r => {
            this.incoming.attachments = this.incoming.attachments.filter(it => it.id != attachment.id);
        });
    }

    // ===
    // validate
    validateForm(field?: string) {
        for (let errField in this.errors) {
            if (this.incoming[errField]) {
                this.errors[errField] = false;
            }
        }

        let isValid = true;
        for (let errField in this.errors) {
            if (this.errors[errField] !== false) {
                isValid = false;
                break;
            }
        }
        this.isValid = isValid;
    }
}
