import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { CommentsComponent } from '../comment/comments';
import { NotificationService } from '../../shared/notification';
import { AppService } from '../../services';
import { IEnvironmentState } from '../../reducers/environment.reducer';
import { ITaskState } from '../../reducers/task.reducer';
import { TaskActions } from '../../actions';
import { TaskService } from '../../services';
import { Project, Task, Tag, TaskType, Request, Comment, Employee, Attachment } from '../../models';
import { imgToBase64 } from '../../utils/utils';

@Component({
    selector: 'task',
    template: require('./templates/task.html')
})

export class TaskComponent {
    private subs: any = [];
    isReady = false;
    isNew = true;
    isEditable = false;
    isValid = true;
    isSubtask = false;
    parentTask: Task;
    subTasks: Task[] = [];
    task: Task;
    acl: any = {};
    rights: any = {
        addSubtask: false,
        doRequest: false,
        doResolution: false,
        addComment: false,
        removeTask: false
    };
    FEATURE_FLAGS: any = {
        subTask: true,
        comments: false
    };
    showPropertyTabTitle: boolean = true;
    showProperty: boolean = true;
    showSubtasks: boolean = false;
    showRequests: boolean = false;
    showACLTabTitle: boolean = false;
    showACL: boolean = false;
    showTaskCancelDialog = false;
    hasUnResolvedRequest: boolean = true;
    hasAcceptedRequestResolution: boolean = false;
    taskPriorityTypes: any;
    comments: Comment[];
    requests: Request[];
    errors: any = {};
    redirectUrl: any;

    constructor(
        private store: Store<any>,
        private router: Router,
        private route: ActivatedRoute,
        private translate: TranslateService,
        private taskActions: TaskActions,
        private taskService: TaskService,
        private notifyService: NotificationService,
        private appService: AppService
    ) {
        this.subs.push(this.store.select('task').subscribe((state: ITaskState) => {
            this.comments = state.comments;
            this.requests = state.requests;

            if (!this.requests) {
                this.hasUnResolvedRequest = false;
            } else {
                this.hasUnResolvedRequest = false;
                this.hasAcceptedRequestResolution = false;

                this.requests.forEach(it => {
                    if (it.resolution == 'UNKNOWN') {
                        this.hasUnResolvedRequest = true;
                    }
                    if (it.resolution == 'ACCEPT') {
                        this.hasAcceptedRequestResolution = true;
                    }
                });
            }
        }));

        this.subs.push(this.store.select('environment').subscribe((state: IEnvironmentState) => {
            this.redirectUrl = state.redirectUrl;
        }));
    }

    ngOnInit() {
        this.subs.push(this.route.params.subscribe(params => {
            this.isReady = false;
            this.task = null;
            this.showProperty = true;
            this.showSubtasks = false;
            this.showRequests = false;
            this.hasUnResolvedRequest = true;
            this.hasAcceptedRequestResolution = false;
            this.isNew = (params['taskId'] === 'new') || (params['taskId'] && params['new'] === 'new')
            this.isSubtask = params['taskId'] && params['new'] === 'new';
            this.showPropertyTabTitle = !this.isNew;
            this.showACLTabTitle = this.showPropertyTabTitle;
            this.showTaskCancelDialog = false;

            this.taskService.fetchTaskById(params['taskId']).subscribe(
                task => {
                    if (this.isSubtask) {
                        this.parentTask = task;
                        this.task = new Task();
                        this.task.parentTaskId = this.parentTask.id;
                    } else {
                        this.task = task;
                        this.isSubtask = !!this.task.parentTaskId;
                    }
                    if (!this.isNew) {
                        this.loadComments(1);
                        this.loadRequests(1);
                        this.loadSubtasks();
                    }
                    this.parentTask = null;
                    if (this.task.parentTaskId && !this.task.parentTask) {
                        this.taskService.fetchTaskById(this.task.parentTaskId).subscribe(parentTask => {
                            this.parentTask = parentTask;

                            if (this.isNew && this.isSubtask) {
                                this.copyValueFromTask(this.parentTask);
                            }
                            this.isReady = true;
                        });
                    } else {
                        this.isReady = true;
                    }
                    this.isEditable = this.isNew || this.task.editable;
                    this.isValid = true;
                },
                errorResponse => this.handleXhrError(errorResponse)
            );
        }));

        this.taskService.getTaskPriorityTypes().subscribe(tpt => this.taskPriorityTypes = tpt);
    }

    ngOnDestroy() {
        this.store.dispatch({ type: TaskActions.TASK_UNLOAD });
        this.subs.map(s => s.unsubscribe());
    }

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

    copyValueFromTask(task: Task) {
        this.task.title = task.title;
        this.task.priority = task.priority;
        this.task.startDate = task.startDate;
        this.task.dueDate = task.dueDate;
        this.task.tagIds = task.tagIds;
    }

    toggleShowProperty() {
        this.showProperty = true;
        this.showRequests = false;
        this.showSubtasks = false;
        this.showACL = false;
    }

    toggleShowSubtasks() {
        this.showSubtasks = true; // !this.showSubtasks;
        // if (this.showSubtasks) {
        this.showRequests = false;
        this.showProperty = false;
        this.showACL = false;
        // }
    }

    toggleShowACL() {
        this.showACL = true; // !this.showRequests;
        // if (this.showRequests) {
        this.showSubtasks = false;
        this.showProperty = false;
        this.showRequests = false;
        // }
    }

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
            });
    }

    canAddSubTask() {
        return this.FEATURE_FLAGS.subTask && !this.isNew && this.task.status != 'FINISHED' && this.task.status != 'COMPLETED' && this.task.status != 'CANCELLED'; //  && !this.isSubtask
    }

    addSubtask() {
        this.router.navigate(['/task', this.task.id, 'new']);
    }

    //
    showComments() {
        return this.hasFutureComments() && !this.isNew;
    }

    hasFutureComments() {
        return this.FEATURE_FLAGS.comments;
    }

    loadComments(page = 1) {
        this.taskService.fetchComments(this.task, page).subscribe(payload => {
            this.store.dispatch({ type: TaskActions.FETCH_TASK_COMMENTS_FULFILLED, payload: payload });
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
    loadRequests(page = 1) {
        this.taskService.fetchTaskRequests(this.task, page).subscribe(payload => {
            this.store.dispatch({ type: TaskActions.FETCH_TASK_REQUESTS_FULFILLED, payload: payload });
        });
    }

    acceptRequest(request: Request) {
        if (request.requestType.name == 'prolong') {
            this.store.dispatch({
                type: TaskActions.TASK_REQUEST_ACCEPTANCE,
                payload: {
                    task: this.task,
                    request: request
                }
            });
        } else {
            this.taskService.doAcceptRequest(request).subscribe(action => {
                this.store.dispatch(action);
                this.loadRequests(1);
            });
        }
    }

    declineRequest(request: Request) {
        this.taskService.doDeclineRequest(request, '').subscribe(action => {
            this.store.dispatch(action);
            this.loadRequests(1);
        });
    }

    hasRequests() {
        return this.task.hasRequests;
    }

    // loadSubtasks
    loadSubtasks() {
        this.taskService.fetchTasks({ parentTaskId: this.task.id }).subscribe(payload => {
            this.subTasks = payload.tasks;
        });
    }

    hasSubTasks() {
        return this.subTasks && this.subTasks.length;
    }

    onConfirmTaskCancelDialog(cancelComment) {
        this.doCancelTaskRequest(cancelComment);
        // this.showTaskCancelDialog = false;
    }

    onCancelTaskCancelDialog() {
        this.showTaskCancelDialog = false;
    }

    //
    close() {
        // this.router.navigate(['/tasks']);
        // window.history.back();
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
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        } else {
            this.notifyService.error(errorResponse.message).show().remove(3000);
        }
    }

    // check rights
    canSaveTask() {
        return this.isEditable;
    }

    canDoStatusWaiting() {
        return true;
    }

    canDoStatusProcessed() {
        return true;
    }

    canCancelTask() {
        return !this.isNew && this.isEditable && this.task.status != 'FINISHED' && this.task.status != 'COMPLETED' && this.task.status != 'CANCELLED';
    }

    canCompleteTask() {
        return !this.isNew && this.isEditable && this.task.status != 'FINISHED' && this.task.status != 'COMPLETED' && this.task.status != 'CANCELLED';
    }

    canAcknowledgedTask() {
        return !this.isNew && this.task.assigneeUserId == this.appService.employee.userID && this.task.status == 'OPEN';
    }

    canRequestAction() {
        return (this.task && this.task.id && this.task.status != 'FINISHED' && this.task.status != 'COMPLETED' && this.task.status != 'CANCELLED') && !this.hasUnResolvedRequest; // && !this.hasAcceptedRequestResolution;
    }

    newRequest() {
        let navigationExtras: NavigationExtras = {
            queryParams: { 'task': this.task.id }
        };
        // this.store.dispatch({ type: TaskActions.TASK_REQUEST_NEW, payload: this.task });
        this.router.navigate(['/requests', 'new'], navigationExtras);
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
        this.task.projectId = project.id;
        this.validateForm();
    }

    setTaskType(taskType: TaskType) {
        this.task.taskTypeId = taskType.id;
        this.validateForm();
    }

    setAssigneeUser(assigneeUser: Employee[]) {
        this.task.assigneeUserId = assigneeUser[0].userID;
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
        this.task.tagIds = tags.map(it => it.id);
        this.validateForm();
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

    // validateRegNumber($event) {
    //     this.validateForm();
    // }

    // ===
    // validate
    validateForm(field?: string) {
        // if (field && this.errors[field]) {
        //     if (this.project[field]) {
        //         this.errors[field] = false;
        //     }
        // } else {
        //
        // }
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
