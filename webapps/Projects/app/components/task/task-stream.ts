import { Component, Input, Output, OnInit, OnDestroy, HostBinding, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { TaskService } from '../../services';
import { ITasksState } from '../../reducers/tasks.reducer';
import { Task } from '../../models';

@Component({
    selector: 'task-stream',
    template: require('./templates/task-stream.html')
})

export class TaskStreamComponent {
    @HostBinding('class.hidden') get isHidden() { return !this.expanded; };
    // @HostBinding('class.open') get isHidden() { return this.expanded; };
    // @HostBinding('class.close') get isHidden() { return !this.expanded; };
    @HostBinding('class.stream-level') true;
    @Input('level') set _level(level: number) {
        this.level = 1 + level;
    };
    @Input() task: Task;
    @Input() showSelect: boolean = true;
    @Input() expandRoot: boolean = false;
    @Output() toggleStream = new EventEmitter<any>();
    @Output() loadStreamLevel = new EventEmitter<any>();
    private sub: any;
    private expandedIds: string[] = [];
    private loading: boolean = true;
    private expanded: boolean = false;
    private stream: any[] = [];
    public level: number = 1;

    constructor(
        private store: Store<any>,
        private taskService: TaskService
    ) { }

    ngOnInit() {
        this.sub = this.store.select('tasks').subscribe((state: ITasksState) => {
            this.expandedIds = state.expandedIds;

            if (this.expandRoot || this.expandedIds.indexOf(this.task.id) != -1) {
                if (!this.stream.length) {
                    this.loadStream(this.task);
                } else {
                    this.expanded = true;
                    this.onLoadStreamLevel(this.task.id);
                }
            } else {
                // this.stream = [];
                this.expanded = false;
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    loadStream(task: Task) {
        if (task.hasSubtasks || task.hasRequests) {
            this.loading = true;
            this.taskService.fetchTaskStream(this.task).subscribe(
                payload => {
                    this.stream = payload;
                    this.expanded = this.stream.length > 0;
                    this.onLoadStreamLevel(this.task.id);
                },
                err => { console.log('error'); },
                () => { this.loading = false; }
            );
        }
    }

    onLoadStreamLevel(id: string) {
        this.loadStreamLevel.emit(id);
    }

    onToggleStream(id: string) {
        this.toggleStream.emit(id);
    }

    toggleExpandable(id: string, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.onToggleStream(id);
    }
}
