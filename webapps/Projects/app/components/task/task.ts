import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { TAB_DIRECTIVES } from '../../shared/tabs';
import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { MarkdownEditorComponent } from '../../shared/markdown';
import { SwitchButtonComponent } from '../../shared/switch-button';
import { UserSelectComponent } from '../shared/user-select';
import { ProjectSelectComponent } from '../shared/project-select';
import { TaskTypeSelectComponent } from '../shared/task-type-select';
import { TagsSelectComponent } from '../shared/tags-select';
import { TaskRequestsComponent } from './task-requests';
import { TaskRequestComponent } from './task-request';
import { AttachmentsComponent } from '../attachments';
import { CommentsComponent } from '../comment/comments';
import { TASK_REQUEST_NEW, TASK_REQUEST_CANCEL, TASK_CLOSE, ITaskState } from '../../reducers/task.reducer';
import { TextTransformPipe } from '../../pipes';
import { AppService, ProjectService, TaskService, ReferenceService } from '../../services';
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
        UserSelectComponent,
        ProjectSelectComponent,
        TaskTypeSelectComponent,
        TagsSelectComponent,
        TaskRequestsComponent,
        TaskRequestComponent,
        AttachmentsComponent,
        CommentsComponent,
        MarkdownEditorComponent
    ],
    providers: [FormBuilder],
    pipes: [TranslatePipe, TextTransformPipe]
})

export class TaskComponent {
    private sub: any;
    isReady = false;
    isNew = true;
    isSubtask = false;
    parentTask: Task;
    task: Task;
    rights: any = {
        addSubtask: false,
        doRequest: false,
        doResolution: false,
        addComment: false,
        removeTask: false
    };
    form: ControlGroup;
    showRequest: boolean = false;
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
        private appService: AppService,
        private projectService: ProjectService,
        private taskService: TaskService,
        private referenceService: ReferenceService,
        private notifyService: NotificationService
    ) {
        this.store.select('task').subscribe((state: ITaskState) => {
            this.comments = state.comments;
            this.requests = state.requests;

            if (!this.requests) {
                this.hasUnResolvedRequest = false;
            } else {
                this.requests.forEach(it => {
                    if (it.resolution == 'UNKNOWN') {
                        this.hasUnResolvedRequest = true;
                    }
                    if (it.resolution == 'ACCEPT') {
                        this.hasAcceptedRequestResolution = true;
                    }
                });
            }
        });

        this.form = formBuilder.group({
            title: [''],
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
        this.sub = this.route.params.subscribe(params => {
            this.isNew = (params['taskId'] === 'new') || (params['taskId'] && params['new'] === 'new')
            this.isSubtask = params['taskId'] && params['new'] === 'new';

            this.taskService.fetchTaskById(params['taskId']).subscribe(
                action => {
                    if (this.isSubtask) {
                        this.parentTask = action.payload.task;
                        this.task = new Task();
                        this.task.parentTaskId = this.parentTask.id;
                    } else {
                        this.task = action.payload.task;
                        this.isSubtask = !!this.task.parentTaskId;
                    }
                    if (!this.isNew) {
                        this.loadComments(1);
                        this.loadRequests(1);
                    }
                    this.isReady = true;
                },
                errorResponse => this.handleXhrError(errorResponse)
            );
        });

        this.taskService.getTaskStatusTypes().subscribe(tst => this.taskStatusTypes = tst);
        this.taskService.getTaskPriorityTypes().subscribe(tpt => this.taskPriorityTypes = tpt);
    }

    getTitle() {
        if (this.isNew && this.isSubtask) {
            return 'new_subtask';
        } else if (this.isNew) {
            return 'new_task';
        } else if (this.isSubtask) {
            return 'sub_task';
        } else {
            return 'task';
        }
    }

    updateTaskBody(text: string) {
        this.task.body = text;
    }

    saveTask() {
        let noty = this.notifyService.process(this.translate.instant('wait_while_document_save')).show();
        this.taskService.saveTask(this.task).subscribe(
            response => {
                noty.set({ type: 'success', message: response.message }).remove(1500);
                this.close();
            },
            error => {
                noty.set({ type: 'error', message: error.message }).remove(1500);
                this.errorSaveTask(error);
            }
        );
    }

    deleteTask() {
        this.taskService.deleteTask([this.task]).subscribe(data => {
            this.close();
        });
    }

    addSubtask() {
        this.router.navigate(['/task', this.task.id, '/new']);
    }

    //
    loadComments(page) {
        this.taskService.fetchComments(this.task, page).subscribe(action => this.store.dispatch(action));
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
    loadRequests(page) {
        this.taskService.fetchTaskRequests(this.task, page).subscribe(action => {
            this.store.dispatch(action);
        });
    }

    acceptRequest(request: Request) {
        this.taskService.doRequestResolution(request, 'ACCEPT').subscribe(action => {
            this.store.dispatch(action);
            this.loadRequests(1);
        });
    }

    declineRequest(request: Request) {
        this.taskService.doRequestResolution(request, 'DECLINE').subscribe(action => {
            this.store.dispatch(action);
            this.loadRequests(1);
        });
    }

    //
    errorSaveTask(errorResponse) {
        console.log(errorResponse);
    }

    close() {
        this.router.navigate(['/tasks']);
    }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
    }

    canRequestAction() {
        return (this.task && this.task.id && this.task.status != 'FINISHED') && !this.hasUnResolvedRequest && !this.hasAcceptedRequestResolution;
    }

    newRequest() {
        this.store.dispatch({ type: TASK_REQUEST_NEW, payload: this.task });
    }

    getTaskStatusType() {
        return this.taskStatusTypes.filter(it => it.value == this.task.status)[0].text;
    }

    setStatus(value) {
        this.task.status = value;
    }

    setPriority(value) {
        this.task.priority = value;
    }

    closeDropdown() {
        document.body.click();
    }

    selectProject(project: Project) {
        this.task.projectId = project.id;
        this.closeDropdown();
    }

    selectTaskType(taskType: TaskType) {
        this.task.taskTypeId = taskType.id;
        this.closeDropdown();
    }

    selectAssigneeUser(assigneeUser: User) {
        this.task.assigneeUserId = assigneeUser.id;
        this.closeDropdown();
    }

    setTags(tags: Tag[]) {
        this.task.tagIds = tags.map(it => it.id);
    }

    selectTag(tag: Tag) {
        if (!this.task.tagIds) {
            this.task.tagIds = [];
        }
        this.task.tagIds.push(tag.id);
        this.closeDropdown();
    }

    removeTag(tag: Tag, $event) {
        this.task.tagIds.forEach((id, index) => {
            if (id === tag.id) {
                this.task.tagIds.splice(index, 1);
            }
        });

        $event.stopPropagation();
        this.closeDropdown();
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

    ngOnDestroy() {
        this.store.dispatch({ type: TASK_CLOSE });
    }
}
