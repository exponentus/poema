import { Component, OnInit, Input } from '@angular/core';
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
    templateUrl: './tasks.html',
    host: {
        '[class.loadable]': 'true',
        '[class.load]': 'loading'
    }
})

export class TasksComponent {
    @Input() tasks: Task[] = [];
    @Input() embedded: boolean = false;
    @Input() selectable: boolean = true;
    @Input() headerVisible: boolean = true;
    @Input() titleVisible: boolean = true;
    @Input() actionsVisible: boolean = true;
    @Input() captionsVisible: boolean = true;

    private subs: any = [];
    title: string;
    meta: any = {};
    keyWord: string = '';
    expandedIds: string[] = [];
    filter: any = {};
    loading: boolean = true;
    activeSort: string = 'regDate:desc';
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
        if (this.embedded) {
            this.loading = false;
            this.subs.push(this.store.select('tasks').subscribe((state: ITasksState) => {
                if (state) {
                    this.expandedIds = state.expandedIds;
                }
            }));
            return;
        }

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
                this.filter = state.filter;
                this.expandedIds = state.expandedIds;
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

            this.loadData(Object.assign({}, params, this.filter, { page: this.meta.page }));
        }));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    loadData(params) {
        this.loading = true;
        this.params = Object.assign({}, params, {
            'for': this.taskFor,
            'projectId': this.projectId,
            'sort': this.activeSort || 'regDate:desc'
            // 'expandedIds': this.expandedIds
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

    onSort($event) {
        this.activeSort = $event;
        this.refresh();
    }

    changeFilter(filter) {
        this.filter = filter;
        this.store.dispatch(this.taskActions.setFilter(filter));
        this.loadData(filter);
    }

    toggleExpanded(id: string) {
        this.store.dispatch(this.taskActions.toggleExpanded(id));
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
