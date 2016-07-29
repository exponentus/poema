import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { TextTransformPipe, DateFormatPipe } from '../../pipes';
import { PaginationComponent } from '../../shared/pagination';
import { TaskFilterComponent } from './task-filter';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { TaskListComponent } from './task-list';
import { TaskComponent } from './task';
import { TaskActions } from '../../actions';
import { ITasksState } from '../../reducers/tasks.reducer';
import { IEnvironmentState } from '../../reducers/environment.reducer';

@Component({
    selector: 'tasks',
    template: require('./templates/tasks.html'),
    // changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [ROUTER_DIRECTIVES, PaginationComponent, TaskListComponent, TaskFilterComponent],
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe]
})

export class TasksComponent {
    private subs: any = [];
    title: string;
    tasks: Task[];
    meta: any = {};
    keyWord: string = '';
    filter: any = {};
    loading: boolean = true;

    constructor(
        private store: Store<any>,
        private router: Router,
        private route: ActivatedRoute,
        private taskActions: TaskActions,
        private taskService: TaskService,
        private notifyService: NotificationService
    ) { }

    ngOnInit() {
        this.subs.push(this.store.select('environment').subscribe((state: IEnvironmentState) => {
            if (this.keyWord != state.keyWord) {
                this.loadData({
                    keyWord: state.keyWord
                });
            }
            this.keyWord = state.keyWord;
        }));

        this.subs.push(this.store.select('tasks').subscribe((state: ITasksState) => {
            if (state) {
                this.tasks = state.tasks;
                this.meta = state.meta;
                // this.filter = state.filter
                this.loading = state.loading;
            }
        }));

        this.subs.push(this.route.params.subscribe(params => {
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

            this.loadData(Object.assign({}, params, this.filter));
        }));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    loadData(params) {
        this.store.dispatch(this.taskActions.fetchTasks());
        this.taskService.fetchTasks(params).subscribe(
            payload => {
                this.store.dispatch(this.taskActions.fetchTasksFulfilled(payload.tasks, payload.meta));
            },
            error => this.store.dispatch(this.taskActions.fetchTasksFailed(error))
        );
    }

    goToPage(params) {
        this.loadData(Object.assign({}, params, this.filter));
    }

    changeFilter(filter) {
        this.filter = filter;
        this.loadData(filter);
    }

    onToggleStream(id: string) {
        this.store.dispatch(this.taskActions.toggleStreamExpand(id));
    }

    newTask() {
        this.router.navigate(['/task', 'new']);
    }

    deleteTask(task: Task) {
        this.taskService.deleteTask([task]).subscribe();
    }
}
