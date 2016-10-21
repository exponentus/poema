import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { EnvironmentActions } from '../../../../actions';
import { NotificationService } from '../../../../shared/notification';
import { WorkflowOfficeMemoService } from '../../services';
import { Attachment } from '../../../../models';
import { Incoming, Outgoing } from '../../models';
import { imgToBase64 } from '../../../../utils/utils';

@Component({
    selector: 'office-memo-form',
    templateUrl: './office-memo-form.html'
})

export class OfficeMemoFormComponent {
    private isReady = false;
    private isNew = true;
    private isEditable = false;
    private isValid = true;
    private officeMemo: any;
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
        private officeMemoService: WorkflowOfficeMemoService,
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
        this.officeMemoService.fetchOfficeMemoById(id, { fsid: this.fsId }).subscribe(
            payload => {
                this.officeMemo = payload.payload.officeMemo;
                this.actions = payload.payload.actionBar.actions || [];
                this.isNew = this.officeMemo.id == '';
                this.isEditable = this.isNew || this.officeMemo.editable;
                this.isReady = true;
                this.isValid = true;
            },
            error => this.handleXhrError(error)
        );
    }

    //
    get hasExecution() {
        return this.officeMemo.children;
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
        this.officeMemoService.saveOfficeMemo(this.officeMemo, { fsid: this.fsId }).subscribe(
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
        this.officeMemoService.deleteOfficeMemo(this.officeMemo).subscribe(
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
    setRecipient(org: any /* Organization */) {
        this.officeMemo.recipient = org;
        this.validateForm();
    }

    setAppliedRegDate(appliedRegDate: Date) {
        this.officeMemo.appliedRegDate = appliedRegDate;
        this.validateForm();
    }

    setDocLanguage(docLanguage: any) {
        this.officeMemo.docLanguage = docLanguage;
        this.validateForm();
    }

    setDocType(docType: any) {
        this.officeMemo.docType = docType;
        this.validateForm();
    }

    setContent(content: string) {
        this.officeMemo.content = content;
        this.validateForm();
    }

    addAttachment(data) {
        let att: Attachment = new Attachment();
        att.realFileName = data.response.files[0];
        if (!this.officeMemo.attachments) {
            this.officeMemo.attachments = [];
        }
        if (!this.officeMemo.fsid) {
            this.officeMemo.fsid = '' + Date.now();
        }
        if (!data.files[0].type.match('image.*')) {
            this.officeMemo.attachments.push(att);
        } else {
            imgToBase64(data.files[0], (e2) => {
                att.base64 = e2.target.result;
                this.officeMemo.attachments.push(att);
            });
        }
    }

    deleteAttachment(attachment: Attachment) {
        this.officeMemoService.deleteOfficeMemoAttachment(this.officeMemo, attachment).subscribe(r => {
            this.officeMemo.attachments = this.officeMemo.attachments.filter(it => it.id != attachment.id);
        });
    }

    // ===
    // validate
    validateForm(field?: string) {
        for (let errField in this.errors) {
            if (this.officeMemo[errField]) {
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
