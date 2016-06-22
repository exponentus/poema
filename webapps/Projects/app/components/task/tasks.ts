import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';

import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { TextTransformPipe, DateFormatPipe } from '../../pipes';
import { PaginationComponent } from '../../shared/pagination';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { TaskRowComponent } from './task-row';
import { TaskComponent } from './task';

@Component({
    selector: 'tasks',
    template: require('./templates/tasks.html'),
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe],
    directives: [ROUTER_DIRECTIVES, PaginationComponent, TaskRowComponent]
})

export class TasksComponent {
    private sub: any;
    title: string;
    tasks: Task[];
    params: any = {};
    meta: any = {};
    requestProcess: boolean = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private taskService: TaskService,
        private notifyService: NotificationService,
        private translate: TranslateService
    ) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let taskFor = params['for'];
            let projectId = params['projectId'];
            switch (taskFor) {
                case 'inbox':
                    this.title = 'tasks_assigned_to_me';
                    break;
                case 'my':
                    this.title = 'my_tasks';
                    break;
                default:
                    this.title = 'tasks';
                    break;
            }
            //
            this.params = params;
            this.loadData(this.params);
        });
    }

    loadData(params) {
        this.requestProcess = true;
        this.taskService.getTasks(params).subscribe(
            data => {
                this.tasks = data.tasks;
                this.meta = data.meta;
                this.requestProcess = false;
            },
            errorResponse => this.handleXhrError(errorResponse)
        );
    }

    goToPage(params) {
        this.loadData({
            page: params.page
        });
    }

    newTask() {
        this.router.navigate(['/task', 'new']);
    }

    deleteTask(task: Task) {
        this.taskService.deleteTask(task).subscribe();
    }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
    }
}
