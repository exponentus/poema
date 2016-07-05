import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { Task, Request } from '../../models';
import { TaskService } from '../../services';

@Component({
    selector: 'task-requests',
    template: `
        <ul>
            <li *ngFor="let r of requests">
                {{ r.comment }}
            </li>
        </ul>
    `,
    directives: [],
    pipes: [TranslatePipe]
})

export class TaskRequestsComponent {
    @Input() task: Task;
    requests: Request[];

    constructor(
        private store: Store<any>,
        private taskService: TaskService,
        private notifyService: NotificationService
    ) { }

    ngOnInit() {
        this.loadRequests(1);
    }

    loadRequests(page) {
        if (this.task) {
            this.taskService.fetchTaskRequests(this.task, page).subscribe((data: any) => {
                this.requests = data.list;
            });
        }
    }
}
