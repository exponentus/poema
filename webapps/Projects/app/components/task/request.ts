import { Component, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { ITaskState } from '../../reducers/task.reducer';
import { IReferenceState } from '../../reducers/reference.reducer';
import { MarkdownEditorComponent } from '../../shared/markdown';
import { AttachmentsComponent } from '../attachment/attachments';
import { RequestTypeInputComponent } from '../shared/request-type-input';
import { TaskActions } from '../../actions';
import { TaskService } from '../../services';
import { Task, Request, RequestType, Attachment } from '../../models';

@Component({
    selector: 'request',
    template: `
        <form (submit)="sendRequest($event)">
            <header>{{'task_request' | translate}}</header>
            <section>
                <request-type-input
                    editable="true"
                    placeHolder="{{'request_type' | translate}}"
                    (select)="setRequestType($event)">
                </request-type-input>
                <textarea class="rt-editor" placeholder="{{'comment' | translate}}" [(ngModel)]="comment"></textarea>
                <!-- <markdown-editor
                    [markdown]="''"
                    editable="true"
                    placeHolder="{{'comment' | translate}}"
                    updateTimeout="100"
                    (update)="setComment($event)">
                </markdown-editor> -->
                <attachments [model]="request" editable="true" (upload)="addAttachment($event)" (delete)="deleteAttachment($event)"></attachments>
            </section>
            <footer>
                <button class="btn btn-cancel" type="button" (click)="cancel()">{{'cancel' | translate}}</button>
                <button class="btn btn-primary" type="submit" [disabled]="!requestType">{{'send_request' | translate}}</button>
            </footer>
        </form>
    `,
    host: {
        '[class.request-composer]': 'true',
        '[class.open]': 'isOpen',
        '(keyup.escape)': 'cancel()'
    },
    directives: [AttachmentsComponent, RequestTypeInputComponent, MarkdownEditorComponent],
    pipes: [TranslatePipe]
})

export class RequestComponent {
    @Output() send = new EventEmitter<any>();
    private taskSub: any;
    private refSub: any;

    private request: Request;
    private isOpen = false;
    private requestTypes: RequestType[];
    private requestType: RequestType;
    private comment: string;

    constructor(
        private store: Store<any>,
        private translate: TranslateService,
        private notifyService: NotificationService,
        private taskService: TaskService
    ) {
        this.refSub = store.select('reference').subscribe((state: IReferenceState) => {
            this.requestTypes = state.requestTypes;
        });

        this.taskSub = store.select('task').subscribe((state: ITaskState) => {
            if (state) {
                this.request = state.request || new Request();
                this.isOpen = state.showRequest;

                if (state.task) {
                    this.request.taskId = state.task.id;

                    if (!this.request.fsid) {
                        this.request.fsid = '' + Date.now();
                    }
                }
            }
        });
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.taskSub.unsubscribe();
    }

    cancel() {
        this.store.dispatch({ type: TaskActions.TASK_REQUEST_CANCEL });
    }

    sendRequest($event) {
        $event.preventDefault();

        this.request.comment = this.comment;
        this.request.requestTypeId = this.requestType.id;

        this.taskService.sendTaskRequest(this.request).subscribe(response => {
            this.notifyService.info(this.translate.instant('request_send_success')).show().remove(3000);
            this.cancel();
            this.send.emit({
                requestSendSuccess: true
            });
        });
    }

    setRequestType(requestType: RequestType) {
        this.requestType = requestType;
    }

    setComment(comment: string) {
        this.comment = comment;
    }

    addAttachment(file) {
        let att: Attachment = new Attachment();
        att.realFileName = file.files[0];
        if (!this.request.attachments) {
            this.request.attachments = [];
        }
        this.request.attachments.push(att);
    }

    deleteAttachment(attachment: Attachment) {
        // this.taskService.deleteRequestAttachment(this.request, attachment).subscribe(r => {
        this.request.attachments = this.request.attachments.filter(it => it.id != attachment.id);
        // });
    }
}
