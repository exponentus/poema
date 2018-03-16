import { Component, Input } from '@angular/core';

import { Task } from '../../models';

@Component({
    selector: 'task-list',
    templateUrl: './task-list.html'
})
export class TaskListComponent {
    @Input() tasks: Task[];
}
