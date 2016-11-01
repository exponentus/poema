import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../../../shared/notification';
import { IEnvironmentState } from '../../../../reducers/environment.reducer';
import { TaskActions } from '../../actions';
import { TaskService } from '../../services';
import { Attachment } from '../../../../models/attachment';
import { Project, Task, Tag, TaskType, Request, Comment, Employee } from '../../models';
import { imgToBase64 } from '../../../../utils/utils';

@Component({
    selector: 'task',
    templateUrl: './task.html'
})

export class TaskComponent {
    private subs: any = [];
    isReady = false;
    isNew = true;
    isEditable = false;
    isValid = true;
    isSubtask = false;
    parentTask: Task;
    task: Task;
    acl: any = {};
    actions: any = {};
    FEATURE_FLAGS: any = {
        subTask: true,
        comments: false
    };

    showPropertyTab: boolean = true;
    showStreamTab: boolean = false;
    showObserversTab: boolean = false;
    showACLTab: boolean = false;

    showTaskCancelDialog = false;
    taskObsManualyChanged = false;
    taskPriorityTypes: any;
    comments: Comment[];
    errors: any = {};
    redirectUrl: any;

    constructor(
        private store: Store<any>,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private translate: TranslateService,
        private taskActions: TaskActions,
        private taskService: TaskService,
        private notifyService: NotificationService
    ) {
        this.subs.push(this.store.select('environment').subscribe((state: IEnvironmentState) => {
            this.redirectUrl = state.redirectUrl;
        }));
    }

    ngOnInit() {
        this.taskService.getTaskPriorityTypes().subscribe(tpt => this.taskPriorityTypes = tpt);

        this.subs.push(this.activatedRoute.params.subscribe((params: any) => {
            let parentTaskId = this.router.routerState.snapshot.root.queryParams['parentTaskId'] || undefined;
            let projectId = this.router.routerState.snapshot.root.queryParams['projectId'] || undefined;
            this.loadTask(params['taskId'], { projectId, parentTaskId });
        }));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    // ===
    loadTask(taskId: string, params: any = {}) {
        this.isReady = false;
        this.task = null;
        this.parentTask = null;
        this.togglePropertyTab();
        this.isSubtask = false;
        this.showTaskCancelDialog = false;
        this.acl = {};
        this.actions = {};

        this.taskService.fetchTaskById(taskId, params).subscribe(
            ({task, parentTask, actions}) => {
                this.actions = actions || {};

                this.task = task;
                if (this.task.parentTaskId) {
                    this.isSubtask = true;
                    this.parentTask = parentTask;
                }

                this.isReady = true;
                this.isNew = this.task['isNew'];
                this.isEditable = this.isNew || this.task.editable;
                this.isValid = true;

                if (!this.isNew && this.FEATURE_FLAGS.comments) {
                    this.loadComments(1);
                }
            },
            error => this.handleXhrError(error)
        );
    }

    // === task title
    get title() {
        if (this.isNew && this.isSubtask) {
            return 'new_subtask';
        } else if (this.isNew) {
            return 'new_task';
        } else if (this.isSubtask) {
            return 'subtask';
        } else {
            return 'task';
        }
    }

    // === actions
    get canSave() {
        return this.actions['save_and_close'];
    }

    get canCancelTask() {
        return this.actions['task_cancel'];
    }

    get canCompleteTask() {
        return this.actions['task_complete'];
    }

    get canAcknowledgedTask() {
        return this.actions['task_acknowledged'];
    }

    get canRequestAction() {
        return this.actions['add_request'];
    }

    get canAddSubTask() {
        return this.actions['add_subtask'];
    }

    get canDelete() {
        return this.actions['delete_document'];
    }
    // =====

    // ===
    get hasRequests() {
        return this.task.hasRequests;
    }

    get hasSubTasks() {
        return this.task.hasSubtasks;
    }

    get hasACL() {
        return this.task.id && this.task.acl;
    }

    get showComments() {
        return this.hasFutureComments && !this.isNew;
    }

    get hasFutureComments() {
        return this.FEATURE_FLAGS.comments;
    }
    // =====

    copyValueFromTask(task: Task) {
        this.task.title = task.title;
        this.task.priority = task.priority;
        this.task.startDate = task.startDate;
        this.task.dueDate = task.dueDate;
        this.task.tags = task.tags;
    }

    // === tab toggle actions
    togglePropertyTab() {
        this.showPropertyTab = true;
        this.showStreamTab = false;
        this.showObserversTab = false;
        this.showACLTab = false;
    }

    toggleStreamTab() {
        this.showStreamTab = true;
        this.showPropertyTab = false;
        this.showObserversTab = false;
        this.showACLTab = false;
    }

    toggleObserversTab() {
        this.showObserversTab = true;
        this.showPropertyTab = false;
        this.showStreamTab = false;
        this.showACLTab = false;
    }

    toggleACLTab() {
        this.showACLTab = true;
        this.showStreamTab = false;
        this.showPropertyTab = false;
        this.showObserversTab = false;
    }
    // =====

    saveTask() {
        let noty = this.notifyService.process(this.translate.instant('wait_while_document_save')).show();
        this.taskService.saveTask(this.task).subscribe(
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

    completeTask() {
        let noty = this.notifyService.process(this.translate.instant('wait_while_process')).show();
        this.taskService.completeTask(this.task).subscribe(
            response => {
                noty.set({ type: 'success', message: response.message }).remove(1500);
                this.close();
            },
            error => {
                noty.remove();
                this.handleXhrError(error);
            }
        );
    }

    cancelTask() {
        this.showTaskCancelDialog = true;
    }

    doCancelTaskRequest(cancelComment?: string) {
        let noty = this.notifyService.process(this.translate.instant('wait_while_process')).show();
        this.taskService.cancelTask(this.task, cancelComment).subscribe(
            response => {
                noty.set({ type: 'success', message: response.message }).remove(1500);
                this.close();
            },
            error => {
                noty.remove();
                this.handleXhrError(error);
            }
        );
    }

    acknowledgedTask() {
        let noty = this.notifyService.process(this.translate.instant('wait_while_process')).show();
        this.taskService.acknowledgedTask(this.task).subscribe(
            response => {
                noty.set({ type: 'success', message: response.message }).remove(1500);
                this.close();
            },
            error => {
                noty.remove();
                this.handleXhrError(error);
            }
        );
    }

    deleteTask() {
        this.taskService.deleteTask([this.task]).subscribe(
            data => {
                this.close();
            },
            error => {
                this.handleXhrError(error);
            }
        );
    }

    addSubtask() {
        this.router.navigate(['/task', 'new'], {
            queryParams: { 'parentTaskId': this.task.id }
        });
    }

    //
    loadComments(page = 1) {
        this.taskService.fetchComments(this.task, page).subscribe(payload => {

        });
    }

    saveComment(comment: Comment) {
        this.taskService.saveComment(this.task, comment).subscribe(r => {
            this.loadComments(1);
        });
    }

    deleteComment(comment: Comment) {
        this.taskService.deleteComment(comment).subscribe(response => {
            this.loadComments(1);
        });
    }

    //
    onConfirmTaskCancelDialog(cancelComment) {
        this.doCancelTaskRequest(cancelComment);
        // this.showTaskCancelDialog = false;
    }

    onCancelTaskCancelDialog() {
        this.showTaskCancelDialog = false;
    }

    //
    close() {
        this.router.navigateByUrl(this.redirectUrl);
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

    handleXhrError(errorResponse) {
        this.notifyService.error(errorResponse.message).show().remove(3000);
    }

    newRequest() {
        this.router.navigate(['/requests', 'new'], {
            queryParams: { 'task': this.task.id }
        });
    }

    onSendRequest({requestSendSuccess}) {
        if (requestSendSuccess) {
            this.close();
        }
    }

    // ===

    setStatus(value) {
        this.task.status = value;
        this.validateForm();
    }

    setPriority(value) {
        this.task.priority = value;
        this.validateForm();
    }

    setProject(project: Project) {
        this.task.project = project;
        this.task.projectId = project ? project.id : '';
        if (!this.task.id && !this.taskObsManualyChanged) {
            // TODO fetch observers
            this.task.observerUserIds = project.observerUserIds;
        }
        this.validateForm();
    }

    setTaskType(taskType: TaskType) {
        this.task.taskType = taskType;
        this.task.taskTypeId = taskType ? taskType.id : '';
        this.validateForm();
    }

    setAssigneeUser(assigneeUser: Employee) {
        this.task.assignee = assigneeUser;
        this.task.assigneeUserId = assigneeUser ? assigneeUser.userID : '';
        this.validateForm();
    }

    setStartDate(date) {
        this.task.startDate = date;
        this.validateForm();
    }

    setDueDate(date) {
        this.task.dueDate = date;
        this.validateForm();
    }

    updateTaskBody(text: string) {
        this.task.body = text;
        this.validateForm();
    }

    setTags(tags: Tag[]) {
        this.task.tags = tags;
        this.validateForm();
    }

    setObserver(observers: Employee[]) {
        this.taskObsManualyChanged = true;
        this.task.observers = observers;
        this.task.observerUserIds = observers ? observers.map(it => it.userID) : null;
    }

    addAttachment(data) {
        let att: Attachment = new Attachment();
        att.realFileName = data.response.files[0];
        if (!this.task.attachments) {
            this.task.attachments = [];
        }
        if (!this.task.fsid) {
            this.task.fsid = '' + Date.now();
        }
        if (!data.files[0].type.match('image.*')) {
            this.task.attachments.push(att);
        } else {
            imgToBase64(data.files[0], (e2) => {
                att.base64 = e2.target.result;
                this.task.attachments.push(att);
            });
        }
    }

    deleteAttachment(attachment: Attachment) {
        this.taskService.deleteTaskAttachment(this.task, attachment).subscribe(r => {
            this.task.attachments = this.task.attachments.filter(it => it.id != attachment.id);
        });
    }

    // ===
    // validate
    validateForm(field?: string) {
        for (let errField in this.errors) {
            if (this.task[errField]) {
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
