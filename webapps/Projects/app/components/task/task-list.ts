import { Component, Input, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { Store } from '@ngrx/store';

import { UserInputComponent, TagsInputComponent } from '../shared';
import { TextTransformPipe, DateFormatPipe } from '../../pipes';
import { TaskStreamComponent } from './task-stream';
import { TaskActions } from '../../actions';
import { ITasksState } from '../../reducers/tasks.reducer';
import { Task } from '../../models';

@Component({
    selector: 'task-list',
    template: require('./templates/task-list.html'),
    directives: [ROUTER_DIRECTIVES, UserInputComponent, TagsInputComponent, TaskStreamComponent],
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe]
})

export class TaskListComponent {
    @Input('tasks') set _tasks(tasks: Task[]) {
        this.tasks = tasks;
        this.selectedIds = [];
        this.isSelectedAll = false;
        this.loadedExpandedCount = 0;
        this.loading = true; // this.tasks.filter(it => (it.hasSubtasks || it.hasRequests)).length > 0 && this.expandedIds.length > 0;

        if (this.loading && this.tasks.length > 0) {
            this.timeout = setTimeout(() => {
                this.loading = false;
            }, 300);
        }
    }
    @Input() showHeader: boolean = true;
    @Input() showSelect: boolean = true;
    @Input() streamMode: boolean = false;
    private sub: any;
    private tasks: Task[];
    private selectedIds: string[] = [];
    private isSelectedAll: boolean = false;
    private loading: boolean = true;
    private expandedIds: string[] = [];
    private loadedExpandedCount: number = 0;
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
    onLoadStreamLevel(id: string) {
        this.loadedExpandedCount++;
        if (this.loadedExpandedCount >= this.expandedIds.length) {
            this.loading = false;
            this.loadedExpandedCount--;
            clearTimeout(this.timeout);
        }
    }

    onToggleStream(id: string) {
        this.store.dispatch(this.taskActions.toggleStreamExpand(id));
    }

    toggleExpandable(id: string, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.onToggleStream(id);
    }
}
