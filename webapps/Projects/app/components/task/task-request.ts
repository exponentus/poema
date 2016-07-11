import { Component, Input, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import {
    ITaskState,
    TASK_REQUEST_NEW,
    TASK_REQUEST_CANCEL
} from '../../reducers/task.reducer';
import { IReferenceState } from '../../reducers/reference.reducer';
import { TaskService } from '../../services';
import { Task, Request, RequestType, Attachment } from '../../models';
import { AttachmentsComponent } from '../attachments';

@Component({
    selector: 'task-request',
    template: `
        <form class="task-request-form" [ngFormModel]="rtForm" (submit)="sendRequest($event)">
            <header>{{ 'task_request' | translate }}</header>
            <section>
                <div>
                    <select ngControl="requestTypeId" #rt>
                        <option value="{{ rt.id }}"
                            [selected]="rt.id == requestType?.id"
                            *ngFor="let rt of requestTypes">{{ rt.name }}</option>
                    </select>
                </div>
                <textarea class="request-comment" ngControl="comment">{{ comment }}</textarea>
                <attachments [entity]="request" (upload)="addAttachment($event)" (delete)="addAttachment($event)"></attachments>
            </section>
            <footer>
                <button class="btn" type="button" (click)="cancel()">{{ 'cancel' | translate }}</button>
                <button class="btn btn-primary" type="submit" [disabled]="!rt.value">{{ 'send_request' | translate }}</button>
            </footer>
        </form>
    `,
    directives: [FORM_DIRECTIVES, AttachmentsComponent],
    host: {
        '[class.task-request]': 'true',
        '[class.task-request-open]': 'isOpen',
        '(keyup.escape)': 'cancel()'
    },
    pipes: [TranslatePipe]
})

export class TaskRequestComponent {
    private taskSub: any;
    private refSub: any;

    private rtForm;
    private task: Task;
    private request: Request;
    private isOpen = false;
    private requestTypes: RequestType[];
    private requestType: RequestType;
    private comment: string;

    constructor(
        private store: Store<any>,
        private notifyService: NotificationService,
        private taskService: TaskService,
        fb: FormBuilder
    ) {
        this.rtForm = fb.group({
            requestTypeId: [""],
            comment: [""]
        });
        this.refSub = store.select('reference').subscribe((state: IReferenceState) => {
            this.requestTypes = state.requestTypes;
        });

        this.taskSub = store.select('task').subscribe((state: ITaskState) => {
            if (state) {
                this.request = state.request || new Request();
                this.isOpen = state.showRequest;

                if (state.task) {
                    this.task = state.task;
                    this.request.taskId = this.task.id;

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
        this.store.dispatch({ type: TASK_REQUEST_CANCEL });
    }

    sendRequest($event) {
        $event.preventDefault();

        this.request.comment = this.rtForm.value.comment;
        this.request.requestTypeId = this.rtForm.value.requestTypeId;

        this.taskService.sendTaskRequest(this.request).subscribe(response => {
            this.notifyService.info('request send: success').show().remove(3000);
            this.cancel();
        });
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
        console.log(attachment);
    }
}
