import { Component, Input, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';

import { TaskActions } from '../../actions';
import { ITasksState } from '../../reducers/tasks.reducer';
import { Task } from '../../models';

@Component({
    selector: 'task-list',
    template: require('./task-list.html')
})

export class TaskListComponent {
    @Input('tasks') set _tasks(tasks: Task[]) {
        this.tasks = tasks;
        this.selectedIds = [];
        this.isSelectedAll = false;
        this.loading = true; // this.tasks.filter(it => (it.hasSubtasks || it.hasRequests)).length > 0 && this.expandedIds.length > 0;

        if (this.loading && this.tasks.length > 0) {
            this.timeout = setTimeout(() => {
                this.loading = false;
            }, 300);
        }
    }
    @Input() headerVisible: boolean = true;
    @Input() showSelect: boolean = true;
    @Input() streamMode: boolean = false;
    private sub: any;
    private tasks: Task[];
    private selectedIds: string[] = [];
    private isSelectedAll: boolean = false;
    private loading: boolean = true;
    private expandedIds: string[] = [];
    private timeout: number = 0;

    constructor(
        private store: Store<any>,
        private taskActions: TaskActions
    ) {
        this.sub = this.store.select('tasks').subscribe((state: ITasksState) => {
            this.expandedIds = state.expandedIds;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    // select
    isSelected(id: string) {
        return this.selectedIds.indexOf(id) != -1;
    }

    toggleSelectAll() {
        if (this.selectedIds.length) {
            this.selectedIds = [];
            this.isSelectedAll = false;
        } else {
            this.selectedIds = this.tasks.map(it => it.id);
            this.isSelectedAll = true;
        }
    }

    toggleSelected(id: string) {
        let index = this.selectedIds.indexOf(id);
        if (index != -1) {
            this.selectedIds.push(id);
        } else {
            this.selectedIds.splice(index);
            if (!this.selectedIds.length) {
                this.isSelectedAll = false;
            }
        }
    }

    // level
    onToggleStream(id: string) {
        this.store.dispatch(this.taskActions.toggleStreamExpand(id));
    }

    toggleExpandable(id: string, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.onToggleStream(id);
    }
}
