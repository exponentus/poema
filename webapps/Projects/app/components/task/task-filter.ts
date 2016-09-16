import { Component, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { ITasksState } from '../../reducers/tasks.reducer';
import { TaskType, Employee, Tag } from '../../models';

@Component({
    selector: 'task-filter',
    template: `
        <div class="task-filter__icon"><i class="fa fa-filter"></i></div>
        <task-status-input [status]="taskStatus" editable="true" allowClear="true" placeHolder="{{'status' | translate}}" (select)="setTaskStatus($event)"></task-status-input>
        <task-type-input [id]="taskTypeId" editable="true" allowClear="true" placeHolder="{{'task_type' | translate}}" (select)="setTaskType($event)"></task-type-input>
        <employee-input [ids]="[assigneeUserId]" editable="true" allowClear="true" placeHolder="{{'assignee_user' | translate}}" (select)="setAssigneeUser($event)"></employee-input>
        <tags-input [ids]="tagIds" editable="true" allowClear="true" placeHolder="{{'tags' | translate}}" (select)="setTags($event)"></tags-input>
    `,
    host: {
        '[class.task-filter]': 'true'
    }
})

export class TaskFilterComponent {
    @Output() change = new EventEmitter<any>();

    private taskStatus: string = '';
    private taskTypeId: string = '';
    private assigneeUserId: string = '';
    private tagIds: string[] = [];

    private sub: any;

    constructor(
        private store: Store<any>
    ) {
        this.sub = this.store.select('tasks').subscribe((state: ITasksState) => {
            if (state) {
                this.taskStatus = state.filter.taskStatus;
                this.taskTypeId = state.filter.taskTypeId;
                this.assigneeUserId = state.filter.assigneeUserId;
                this.tagIds = state.filter.tagIds;
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    setTaskStatus(taskStatus: string) {
        this.taskStatus = taskStatus;
        this.updateFilter();
    }

    setTaskType(taskType: TaskType) {
        if (taskType) {
            this.taskTypeId = taskType.id;
        } else {
            this.taskTypeId = '';
        }
        this.updateFilter();
    }

    setAssigneeUser(assigneeUsers: Employee) {
        if (assigneeUsers) {
            this.assigneeUserId = assigneeUsers.userID;
        } else {
            this.assigneeUserId = '';
        }
        this.updateFilter();
    }

    setTags(tags: Tag[]) {
        this.tagIds = tags.map(it => it.id);
        this.updateFilter();
    }

    updateFilter() {
        this.change.emit({
            taskStatus: this.taskStatus,
            taskTypeId: this.taskTypeId,
            assigneeUserId: this.assigneeUserId,
            tagIds: this.tagIds
        });
    }
}
