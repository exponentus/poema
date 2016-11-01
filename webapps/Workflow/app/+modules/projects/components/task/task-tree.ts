import { Component, Input, Output, OnInit, OnDestroy, HostBinding, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { TaskService } from '../../services';
import { TaskActions } from '../../actions';
import { ITasksState } from '../../reducers/tasks.reducer';
import { Task } from '../../models';

@Component({
    selector: 'task-tree',
    templateUrl: './task-tree.html'
})

export class TaskTreeComponent {
    @HostBinding('class.hidden') get isHidden() { return !this.expanded; };
    @Input() level: string = '';
    @Input() rootId: string;
    @Input() children: any = [];
    @Input() expand: boolean = false;
    @Input() selectable: boolean = true;
    @Input() employees: any = {};

    private expandedIds: string[] = [];
    private expanded: boolean = false;
    private sub: any;

    constructor(
        private store: Store<any>,
        private taskActions: TaskActions
    ) { }

    ngOnInit() {
        this.sub = this.store.select('tasks').subscribe((state: ITasksState) => {
            if (state) {
                this.expandedIds = state.expandedIds;
            }

            if (this.expand || this.expandedIds.indexOf(this.rootId) != -1) {
                this.expanded = true;
            } else {
                this.expanded = false;
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    toggleExpanded(id: string) {
        this.store.dispatch(this.taskActions.toggleExpanded(id));
    }
}
