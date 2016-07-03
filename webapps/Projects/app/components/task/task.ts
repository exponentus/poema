import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { SwitchButtonComponent } from '../../shared/switch-button';
import { UserSelectComponent } from '../shared/user-select';
import { ProjectSelectComponent } from '../shared/project-select';
import { TaskTypeSelectComponent } from '../shared/task-type-select';
import { TagsSelectComponent } from '../shared/tags-select';
import { TaskRequestComponent } from './task-request';
import { AttachmentsComponent } from '../attachments';
import { CommentsComponent } from '../comment/comments';
import { TASK_REQUEST_NEW, TASK_REQUEST_CANCEL } from '../../reducers/task.reducer';
import { TextTransformPipe } from '../../pipes';
import { AppService, ProjectService, TaskService, ReferenceService } from '../../services';
import { Project, Task, Tag, TaskType, User } from '../../models';

@Component({
    selector: 'task',
    template: require('./templates/task.html'),
    directives: [
        ROUTER_DIRECTIVES,
        FORM_DIRECTIVES,
        SwitchButtonComponent,
        DROPDOWN_DIRECTIVES,
        UserSelectComponent,
        ProjectSelectComponent,
        TaskTypeSelectComponent,
        TagsSelectComponent,
        TaskRequestComponent,
        AttachmentsComponent,
        CommentsComponent
    ],
    providers: [FormBuilder],
    pipes: [TranslatePipe, TextTransformPipe]
})

export class TaskComponent {
    private sub: any;
    isReady = false;
    task: Task;
    form: ControlGroup;

    taskPriorityTypes: any;
    taskStatusTypes: any;

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
        this.form = formBuilder.group({
            projectId: [''],
            taskTypeId: [''],
            status: [''],
            priority: [''],
            body: ['', Validators.required],
            assigneeUserId: [''],
            startDate: [''],
            dueDate: [''],
            tagIds: [''],
            attachments: ['']
        });
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.taskService.fetchTaskById(params['taskId']).subscribe(
                task => {
                    this.task = task;
                    this.isReady = true;
                },
                errorResponse => this.handleXhrError(errorResponse)
            );
        });

        this.taskService.getTaskStatusTypes().subscribe(tst => this.taskStatusTypes = tst);
        this.taskService.getTaskPriorityTypes().subscribe(tpt => this.taskPriorityTypes = tpt);
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
        return true; // this.task.status && this.task.status != 'DRAFT';
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

    ngOnDestroy() {
        this.taskPriorityTypes = [];
        this.taskStatusTypes = [];
        this.store.dispatch({ type: TASK_REQUEST_CANCEL });
    }
}
