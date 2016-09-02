import { Component, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { IEnvironmentState } from '../../reducers/environment.reducer';
import { ITaskState } from '../../reducers/task.reducer';
import { IReferenceState } from '../../reducers/reference.reducer';
import { TaskActions } from '../../actions';
import { TaskService } from '../../services';
import { Task, Request, RequestType, Attachment } from '../../models';

@Component({
    selector: 'request',
    template: require('./request.html')
})

export class RequestComponent {
    @Output() send = new EventEmitter<any>();
    private subs: any = [];

    private task: Task;
    private request: Request;
    private isReady = false;
    private isNew = true;
    private dueDate: string = '';
    private editable: boolean = true;
    private isResolveAction: boolean = false;
    private showDeclineDialog: boolean = false;

    redirectUrl: any;

    constructor(
        private store: Store<any>,
        private router: Router,
        private route: ActivatedRoute,
        private translate: TranslateService,
        private notifyService: NotificationService,
        private taskService: TaskService
    ) { }

    ngOnInit() {
        this.subs.push(this.store.select('environment').subscribe((state: IEnvironmentState) => {
            this.redirectUrl = state.redirectUrl;
        }));

        this.subs.push(this.route.params.subscribe(params => {
            this.isReady = false;
            this.isNew = params['requestId'] === 'new';
            this.editable = this.isNew;
            this.isResolveAction = false;

            this.taskService.fetchRequestById(params['requestId']).subscribe(
                request => {
                    this.request = request;
                    if (this.isNew) {
                        this.request.taskId = this.route.snapshot.queryParams['task'];
                    } else {
                        this.isResolveAction = this.request.resolution == 'UNKNOWN' && this.request.requestType.name === 'prolong';
                    }
                    //
                    this.taskService.fetchTaskById(this.request.taskId).subscribe(task => {
                        this.task = task;
                        this.isReady = true;
                    });
                },
                errorResponse => this.handleXhrError(errorResponse)
            );
        }));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        } else {
            this.notifyService.error(errorResponse.message).show().remove(3000);
        }
    }

    close() {
        // window.history.back();
        // this.router.navigate(['/tasks']);
        this.router.navigateByUrl(this.redirectUrl);
    }

    onConfirmDeclineDialog(comment: string) {
        this.doDecline(this.request, comment);
    }

    onCancelDeclineDialog() {
        this.showDeclineDialog = false;
    }

    decline() {
        this.showDeclineDialog = true;
    }

    cancel() {
        this.store.dispatch({ type: TaskActions.TASK_REQUEST_CANCEL });
    }

    sendRequest() {
        this.taskService.sendTaskRequest(this.request).subscribe(response => {
            this.notifyService.info(this.translate.instant('request_send_success')).show().remove(3000);
            this.close();
            this.send.emit({
                requestSendSuccess: true
            });
        });
    }

    doAccept(request: Request) {
        this.taskService.doAcceptRequest(request, { dueDate: this.dueDate }).subscribe(action => {
            this.store.dispatch(action);
            this.close();
        });
    }

    doDecline(request: Request, comment: string) {
        this.taskService.doDeclineRequest(request, comment).subscribe(action => {
            // this.store.dispatch(action);
            this.close();
        });
    }

    setRequestType(requestType: RequestType) {
        this.request.requestTypeId = requestType.id;
    }

    setComment(comment: string) {
        this.request.comment = comment;
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
