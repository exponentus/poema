import { Component, Input, Output, OnInit, HostBinding } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { UserInputComponent, TagsInputComponent } from '../shared';
import { TextTransformPipe, DateFormatPipe } from '../../pipes';
import { TaskService } from '../../services';
import { Task, Request, Comment } from '../../models';

@Component({
    selector: 'task-stream',
    template: require('./templates/task-stream.html'),
    directives: [ROUTER_DIRECTIVES, UserInputComponent, TagsInputComponent, TaskStreamComponent],
    pipes: [DateFormatPipe, TextTransformPipe, TranslatePipe]
})

export class TaskStreamComponent {
    @HostBinding('class.stream-level') true;
    @Input('level') set _level(level: number) {
        this.level = 1 + level;
    };
    @Input() task: Task;

    private loading: boolean = true;
    public level: number = 0;
    private tasks: Task[];
    private comments: Comment[] = [];
    private requests: Request[] = [];

    constructor(private taskService: TaskService) { }

    ngOnInit() {
        this.taskService.fetchTasks({
            parentTaskId: this.task.id
        }).subscribe(action => this.tasks = action.payload.tasks);
    }

    getStream() {
        return this.tasks;
    }
}
