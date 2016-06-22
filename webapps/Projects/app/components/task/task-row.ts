import { Component, Inject, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { TextTransformPipe, DateFormatPipe } from '../../pipes';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'task-row',
    template: require('./templates/task-row.html'),
    directives: [ROUTER_DIRECTIVES],
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe]
})

export class TaskRowComponent {
    @Input() task: Task;
    selected: boolean = false;

    constructor(
        private taskService: TaskService,
        private notifyService: NotificationService
    ) { }

    toggleSelected() {
        this.selected = !this.selected;
    }

    deleteTask(task: Task) {
        // this.taskService.deleteTask(task).subscribe();
    }
}
