import { Component, Input, Output, OnInit, OnDestroy, HostBinding, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { TaskService } from '../../services';
import { TaskActions } from '../../actions';
import { ITasksState } from '../../reducers/tasks.reducer';
import { Task } from '../../models';

@Component({
    selector: 'task-tree',
    template: require('./task-tree.html')
})

export class TaskTreeComponent {
    @HostBinding('class.hidden') get isHidden() { return !this.expanded; };
    @Input('level') set _level(level: number) {
        this.level = 1 + level;
    };
    @Input() rootId: string;
    @Input() children: any = [];
    @Input() expand: boolean = false;
    @Input() selectable: boolean = true;

    private expandedIds: string[] = [];
    private expanded: boolean = false;
    public level: number = 1;
    private sub: any;

    constructor(
        private store: Store<any>,
        private taskActions: TaskActions
    ) { }

    ngOnInit() {
        this.sub = this.store.select('tasks').subscribe((state: ITasksState) => {
            this.expandedIds = state.expandedIds;

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

    toggleExpanded(id: string, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.store.dispatch(this.taskActions.toggleExpanded(id));
    }
}
