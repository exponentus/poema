import { Component, Input, Output, OnInit, OnDestroy, HostBinding, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { Store } from '@ngrx/store';

import { UserInputComponent, TagsInputComponent } from '../shared';
import { TextTransformPipe, DateFormatPipe, LocalizedNamePipe } from '../../pipes';
import { TaskService } from '../../services';
import { ITasksState } from '../../reducers/tasks.reducer';
import { Task } from '../../models';

@Component({
    selector: 'task-stream',
    template: require('./templates/task-stream.html'),
    directives: [ROUTER_DIRECTIVES, UserInputComponent, TagsInputComponent, TaskStreamComponent],
    pipes: [DateFormatPipe, TextTransformPipe, TranslatePipe, LocalizedNamePipe]
})

export class TaskStreamComponent {
    @HostBinding('class.stream-level') true;
    @Input('level') set _level(level: number) {
        this.level = 1 + level;
    };
    @Input() task: Task;
    @Input() expandedIds: string[] = [];
    @Output() toggleStream = new EventEmitter<any>();
    private sub: any;
    private loading: boolean = true;
    private stream: any[] = [];
    public level: number = 0;

    constructor(
        private store: Store<any>,
        private taskService: TaskService
    ) { }

    ngOnInit() {
        this.sub = this.store.select('tasks').subscribe((state: ITasksState) => {
            this.expandedIds = state.expandedIds;

            if (this.expandedIds.indexOf(this.task.id) != -1) {
                if (!this.stream.length) {
                    this.loadStream(this.task);
                }
            } else {
                this.stream = [];
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    loadStream(task: Task) {
        if (task.hasSubtasks || task.hasRequests) {
            this.taskService.fetchTaskStream(this.task).subscribe(payload => {
                this.stream = payload;
            });
        }
    }

    onToggleStream(id: string) {
        this.toggleStream.emit(id);
    }

    toggleExpandable(id: string, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.toggleStream.emit(id);
    }
}
