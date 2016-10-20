import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { EnvironmentActions } from '../../../../actions';
import { NotificationService } from '../../../../shared/notification';
import { WorkflowIncomingService } from '../../services';
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
    private incoming: any;
    private fsId: string = '1111111';

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
            this.loadIncoming(id);
        }));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    // ===
    loadIncoming(id: string) {
        this.incomingService.fetchIncomingById(id, { fsid: this.fsId }).subscribe(
            payload => {
                this.incoming = payload.payload.incoming;
                this.actions = payload.payload.actionBar.actions || [];
                this.isNew = this.incoming.id == '';
                this.isEditable = this.isNew || this.incoming.editable;
                this.isReady = true;
                this.isValid = true;
            },
            error => this.handleXhrError(error)
        );
    }

    //
    get hasExecution() {
        return this.incoming.children;
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

        if (error.validation) {
            this.isValid = false;
            for (let err of error.validation.errors) {
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

    setIncomingBody(body: string) {
        this.incoming.body = body;
        this.validateForm();
    }

    addAttachment(data) {
        let att: Attachment = new Attachment();
        att.realFileName = data.response.files[0];
        if (!this.incoming.attachments) {
            this.incoming.attachments = [];
        }
        if (!this.incoming.fsid) {
            this.incoming.fsid = '' + Date.now();
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
