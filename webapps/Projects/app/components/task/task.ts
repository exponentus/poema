import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { SwitchButtonComponent } from '../../shared/switch-button';
import { UserSelectComponent } from '../shared/user-select';
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
        UserSelectComponent],
    providers: [FormBuilder],
    pipes: [TranslatePipe, TextTransformPipe]
})

export class TaskComponent {
    private sub: any;
    isReady = false;
    task: Task;
    form: ControlGroup;

    users: User[];
    tags: Tag[];
    projects: Project[];
    taskTypes: TaskType[];
    taskPriorityTypes: any;
    taskStatusTypes: any;

    constructor(
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
                    // resolve related data
                    this.loadData();
                },
                errorResponse => this.handleXhrError(errorResponse)
            );
        });
    }

    loadData() {
        Observable.forkJoin(
            this.appService.getUsers(),
            // this.referenceService.getTags(), //this.projectService.fetchProjects(),
            // this.referenceService.getTags(),
            // this.referenceService.getTaskTypes(),
            this.taskService.getTaskStatusType(),
            this.taskService.getTaskPriorityType()
        ).subscribe(
            data => {
                this.users = data[0];
                this.projects = data[1].tags; //projects;
                this.tags = data[2].tags;
                this.taskTypes = data[3].taskTypes;
                this.taskStatusTypes = data[4];
                this.taskPriorityTypes = data[5];

                // if (this.task.taskType) {
                //     this.taskTypes.forEach(it => {
                //         if (it.id === this.task.taskType.id) {
                //             this.task.taskType = it;
                //         }
                //     });
                // }
                // if (this.task.project) {
                //     this.projects.forEach(it => {
                //         if (it.id === this.task.project.id) {
                //             this.task.project = it;
                //         }
                //     });
                // }
                // if (this.task.tags) {
                //     let tts = this.task.tags.map(it => it.id);
                //     this.task.tags = this.tags.filter(it => tts.indexOf(it.id) != -1);
                // }
                // if (this.task.assignee) {
                //     this.users.forEach(it => {
                //         if (it.id === this.task.assignee.id) {
                //             this.task.assignee = it;
                //         }
                //     });
                // }

                console.log(this);
            },
            error => {
                this.handleXhrError(error)
            },
            () => this.isReady = true);
    }

    saveTask() {
        let noty = this.notifyService.process(this.translate.get('wait_while_document_save')).show();
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

    setStatus(value) {
        this.task.status = value;
    }

    setPriority(value) {
        this.task.priority = value;
    }

    closeDropdown() {
        document.body.click();
    }

    onScrollSelectList($el, listId) {
        // if end scroll
        if ($el.scrollHeight <= $el.scrollTop + $el.offsetHeight) {
            if (listId === 'project') {
                this.searchProject({
                    page: 2
                });
            }
        }
    }

    searchProject(e) {
        let param = {};
        if (e.target) {
            param = { name: e.target.value };
        } else {
            param = e;
        }
        // this.projectService.fetchProjects(param).subscribe(data => {
        //     this.projects = this.projects.concat(data.projects);
        // });
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
        this.users = [];
        this.tags = [];
        this.projects = [];
        this.taskTypes = [];
        this.taskPriorityTypes = [];
        this.taskStatusTypes = [];
    }
}
