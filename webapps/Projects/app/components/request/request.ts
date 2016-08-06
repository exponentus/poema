import { Component, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { DatepickerDirective } from '../../shared/datepicker/datepicker';
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
                    [editable]="editable"
                    placeHolder="{{'request_type' | translate}}"
                    [requestType]="requestType"
                    (select)="setRequestType($event)">
                </request-type-input>
                <p *ngIf="!editable"></p>
                <textarea class="rt-editor" placeholder="{{'comment' | translate}}" *ngIf="editable" [(ngModel)]="comment"></textarea>
                <!-- <markdown-editor
                    [markdown]="''"
                    editable="true"
                    placeHolder="{{'comment' | translate}}"
                    updateTimeout="100"
                    (update)="setComment($event)">
                </markdown-editor> -->
                <attachments [model]="request" [editable]="editable" (upload)="addAttachment($event)" (delete)="deleteAttachment($event)"></attachments>
            </section>
            <section *ngIf="isResolveAction">
                <b>{{'new_due_date' | translate}}</b>
                <input datepicker class="span2" (select)="setDueDate($event)" />
            </section>
            <footer>
                <button class="btn btn-cancel" type="button" (click)="cancel()">{{'cancel' | translate}}</button>
                <button class="btn btn-primary" type="submit" [disabled]="!requestType || (isResolveAction && !dueDate)">
                    <span *ngIf="!isResolveAction">{{'send_request' | translate}}</span>
                    <span *ngIf="isResolveAction">{{'accept' | translate}}</span>
                </button>
            </footer>
        </form>
    `,
    host: {
        '[class.request-composer]': 'true',
        '[class.open]': 'isOpen',
        '(keyup.escape)': 'cancel()'
    },
    directives: [AttachmentsComponent, RequestTypeInputComponent, MarkdownEditorComponent, DatepickerDirective],
    pipes: [TranslatePipe]
})

export class RequestComponent {
    @Output() send = new EventEmitter<any>();
    private subs: any = [];

    private task: Task;
    private request: Request;
    private isOpen = false;
    private requestTypes: RequestType[];
    private requestType: RequestType;
    private comment: string;
    private dueDate: string;
    private editable: boolean = true;
    private isResolveAction: boolean = false;

    constructor(
        private store: Store<any>,
        private translate: TranslateService,
        private notifyService: NotificationService,
        private taskService: TaskService
    ) {
        this.subs.push(store.select('reference').subscribe((state: IReferenceState) => {
            this.requestTypes = state.requestTypes;
        }));

        this.subs.push(store.select('task').subscribe((state: ITaskState) => {
            if (state) {
                this.task = state.task;
                this.request = state.request || new Request();
                this.requestType = this.request.requestType;
                this.comment = this.request.comment;
                this.isOpen = state.showRequest;
                this.editable = !state.isResolveAction;
                this.isResolveAction = state.isResolveAction;

                if (state.task) {
                    this.request.taskId = state.task.id;

                    if (!this.request.fsid) {
                        this.request.fsid = '' + Date.now();
                    }
                }
            }
        }));
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    cancel() {
        this.store.dispatch({ type: TaskActions.TASK_REQUEST_CANCEL });
    }

    sendRequest($event) {
        $event.preventDefault();

        if (this.isResolveAction) {
            this.taskService.doRequestResolution(this.request, 'ACCEPT', { dueDate: this.dueDate }).subscribe(action => {
                this.store.dispatch(action);
                this.cancel();
                this.send.emit({
                    requestSendSuccess: true
                });
            });
        } else {
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
    }

    setRequestType(requestType: RequestType) {
        this.requestType = requestType;
    }

    setComment(comment: string) {
        this.comment = comment;
    }

    setDueDate(date) {
        this.dueDate = date;
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
