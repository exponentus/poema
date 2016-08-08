import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { DatepickerDirective } from '../../shared/datepicker/datepicker';
import { TAB_DIRECTIVES } from '../../shared/tabs';
import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { MarkdownEditorComponent } from '../../shared/markdown';
import { SwitchButtonComponent } from '../../shared/switch-button';
import { ProjectInputComponent, UserInputComponent, TaskTypeInputComponent, TagsInputComponent } from '../shared';
import { TaskListComponent } from './task-list';
import { RequestListComponent } from '../request/request-list';
import { RequestComponent } from '../request/request';
import { AttachmentsComponent } from '../attachment/attachments';
import { CommentsComponent } from '../comment/comments';
import { ITaskState } from '../../reducers/task.reducer';
import { TextTransformPipe } from '../../pipes';
import { TaskActions } from '../../actions';
import { TaskService } from '../../services';
import { Project, Task, Tag, TaskType, Request, Comment, User, Attachment } from '../../models';

@Component({
    selector: 'task',
    template: require('./templates/task.html'),
    directives: [
        ROUTER_DIRECTIVES,
        FORM_DIRECTIVES,
        SwitchButtonComponent,
        DROPDOWN_DIRECTIVES,
        TAB_DIRECTIVES,
        UserInputComponent,
        ProjectInputComponent,
        TaskTypeInputComponent,
        TagsInputComponent,
        TaskListComponent,
        RequestListComponent,
        RequestComponent,
        AttachmentsComponent,
        CommentsComponent,
        MarkdownEditorComponent,
        DatepickerDirective
    ],
    providers: [FormBuilder],
    pipes: [TranslatePipe, TextTransformPipe]
})

export class TaskComponent {
    private subs: any = [];
    isReady = false;
    isNew = true;
    isEditable = true;
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
    form: ControlGroup;
    showPropertyTabTitle: boolean = true;
    showProperty: boolean = true;
    showSubtasks: boolean = false;
    showRequests: boolean = false;
    hasUnResolvedRequest: boolean = true;
    hasAcceptedRequestResolution: boolean = false;
    taskPriorityTypes: any;
    taskStatusTypes: any;
    comments: Comment[];
    requests: Request[];

    constructor(
        private store: Store<any>,
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private taskActions: TaskActions,
        private taskService: TaskService,
        private notifyService: NotificationService
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

        this.form = formBuilder.group({
            title: ['', Validators.required],
            projectId: [''],
            taskTypeId: [''],
            status: [''],
            priority: [''],
            body: [''/*, Validators.required*/],
            assigneeUserId: [''],
            startDate: [''],
            dueDate: [''],
            tagIds: [''],
            attachments: ['']
        });
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
                        });
                    }
                    this.isEditable = this.isNew || this.task.editable;
                    this.isReady = true;
                },
                errorResponse => this.handleXhrError(errorResponse)
            );
        }));

        this.taskService.getTaskStatusTypes().subscribe(tst => this.taskStatusTypes = tst);
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

    toggleShowProperty() {
        this.showProperty = true;
        this.showRequests = false;
        this.showSubtasks = false;
    }

    toggleShowSubtasks() {
        this.showSubtasks = true; // !this.showSubtasks;
        // if (this.showSubtasks) {
        this.showRequests = false;
        this.showProperty = false;
        // }
    }

    toggleShowRequests() {
        this.showRequests = true; // !this.showRequests;
        // if (this.showRequests) {
        this.showSubtasks = false;
        this.showProperty = false;
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
        return this.FEATURE_FLAGS.subTask && !this.isNew && !this.isSubtask && this.task.status != 'FINISHED';
    }

    addSubtask() {
        this.router.navigate(['/task', this.task.id, '/new']);
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
            this.taskService.doRequestResolution(request, 'ACCEPT').subscribe(action => {
                this.store.dispatch(action);
                this.loadRequests(1);
            });
        }
    }

    declineRequest(request: Request) {
        this.taskService.doRequestResolution(request, 'DECLINE').subscribe(action => {
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

    //
    close() {
        this.router.navigate(['/tasks']);
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

    canCompleteTask() {
        return !this.isNew && this.isEditable && this.task.status != 'FINISHED';
    }

    canRequestAction() {
        return (this.task && this.task.id && this.task.status != 'FINISHED') && !this.hasUnResolvedRequest; // && !this.hasAcceptedRequestResolution;
    }

    newRequest() {
        this.store.dispatch({ type: TaskActions.TASK_REQUEST_NEW, payload: this.task });
    }

    onSendRequest({requestSendSuccess}) {
        if (requestSendSuccess) {
            this.close();
        }
    }

    //
    setStatus(value) {
        this.task.status = value;
    }

    setPriority(value) {
        this.task.priority = value;
    }

    setProject(project: Project) {
        this.task.projectId = project.id;
    }

    setTaskType(taskType: TaskType) {
        this.task.taskTypeId = taskType.id;
    }

    setAssigneeUser(assigneeUser: User[]) {
        this.task.assigneeUserId = assigneeUser[0].id;
    }

    setStartDate(date) {
        this.task.startDate = date;
    }

    setDueDate(date) {
        this.task.dueDate = date;
    }

    updateTaskBody(text: string) {
        this.task.body = text;
    }

    setTags(tags: Tag[]) {
        this.task.tagIds = tags.map(it => it.id);
    }

    addAttachment(file) {
        let att: Attachment = new Attachment();
        att.realFileName = file.files[0];
        if (!this.task.attachments) {
            this.task.attachments = [];
        }
        if (!this.task.fsid) {
            this.task.fsid = '' + Date.now();
        }
        this.task.attachments.push(att);
    }

    deleteAttachment(attachment: Attachment) {
        this.taskService.deleteTaskAttachment(this.task, attachment).subscribe(r => {
            this.task.attachments = this.task.attachments.filter(it => it.id != attachment.id);
        });
    }
}
