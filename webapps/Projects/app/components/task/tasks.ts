import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { TaskService } from '../../services/task.service';
import { TaskActions } from '../../actions';
import { ITasksState } from '../../reducers/tasks.reducer';
import { EnvironmentActions } from '../../actions/environment.actions';
import { IEnvironmentState } from '../../reducers/environment.reducer';
import { Task } from '../../models/task';

@Component({
    selector: 'tasks',
    template: require('./tasks.html'),
    host: {
        '[class.view]': 'true',
        '[class.load]': 'loading'
    }
})

export class TasksComponent {
    private subs: any = [];
    title: string;
    tasks: Task[];
    meta: any = {};
    keyWord: string = '';
    filter: any = {};
    loading: boolean = true;
    private params: any = {};
    private taskFor: string = '';
    private projectId: string = '';
    private init: boolean = false;

    constructor(
        private store: Store<any>,
        private router: Router,
        private route: ActivatedRoute,
        private envActions: EnvironmentActions,
        private taskActions: TaskActions,
        private taskService: TaskService
    ) { }

    ngOnInit() {
        this.subs.push(this.store.select('environment').subscribe((state: IEnvironmentState) => {
            if (this.init) {
                if (this.keyWord != state.keyWord) {
                    this.loadData({
                        keyWord: state.keyWord
                    });
                }
                this.keyWord = state.keyWord;
            } else {
                this.store.dispatch(this.envActions.resetSearch());
                this.init = true;
            }
        }));

        this.subs.push(this.store.select('tasks').subscribe((state: ITasksState) => {
            if (state) {
                this.tasks = state.tasks;
                this.meta = state.meta;
                this.filter = state.filter
                this.loading = state.loading;
            }
        }));

        this.subs.push(this.route.params.subscribe(params => {
            this.taskFor = params['for'];
            this.projectId = params['projectId'];

            switch (this.taskFor) {
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

            let r_url = '';
            if (this.projectId) {
                r_url = `/projects/${this.projectId}/tasks`;
            } else if (this.taskFor) {
                r_url = `/tasks/${this.taskFor}`;
            } else {
                r_url = '/tasks';
            }
            this.store.dispatch(this.envActions.setRedirectUrl(r_url));

            this.loadData(Object.assign({}, params, this.filter));
        }));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    loadData(params) {
        this.loading = true;
        this.params = Object.assign({}, params, {
            'for': this.taskFor,
            'projectId': this.projectId
        });
        this.store.dispatch(this.taskActions.fetchTasks());
        this.taskService.fetchTasks(this.params).subscribe(
            payload => {
                this.store.dispatch(this.taskActions.fetchTasksFulfilled(payload.tasks, payload.meta));
            },
            error => this.store.dispatch(this.taskActions.fetchTasksFailed(error))
        );
    }

    refresh() {
        this.loadData(this.params);
    }

    goToPage(params) {
        this.loadData(Object.assign({}, params, this.filter));
    }

    changeFilter(filter) {
        this.filter = filter;
        this.store.dispatch(this.taskActions.setFilter(filter));
        this.loadData(filter);
    }

    newTask() {
        let queryParams: any = {};
        if (this.projectId) {
            queryParams.projectId = this.projectId;
        }
        this.router.navigate(['/task', 'new'], { queryParams });
    }

    deleteTask(task: Task) {
        this.taskService.deleteTask([task]).subscribe();
    }
}
