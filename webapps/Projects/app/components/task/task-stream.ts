import { Component, Input, Output, OnInit, HostBinding } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { UserInputComponent, TagsInputComponent } from '../shared';
import { TextTransformPipe, DateFormatPipe, LocalizedNamePipe } from '../../pipes';
import { TaskService } from '../../services';
import { Task, Request, Comment } from '../../models';

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

    private loading: boolean = true;
    private stream: any[] = [];
    public level: number = 0;

    constructor(private taskService: TaskService) { }

    ngOnInit() {
        if (this.task.hasSubtasks || this.task.hasRequests) {
            this.taskService.fetchTaskStream(this.task).subscribe(payload => {
                this.stream = payload;
            });
        }
    }

    getStream() {
        return this.stream;
    }
}
