import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';

import { TaskType, Employee, Tag } from '../../models';

@Component({
    selector: 'task-filter',
    template: `
        <div class="task-filter__icon">
            <i class="fa fa-filter"></i>
        </div>
        <task-status-input editable="true" allowClear="true" placeHolder="{{'status' | translate}}" (select)="setTaskStatus($event)"></task-status-input>
        <task-type-input [id]="taskTypeId" editable="true" allowClear="true" placeHolder="{{'task_type' | translate}}" (select)="setTaskType($event)"></task-type-input>
        <employee-input editable="true" allowClear="true" placeHolder="{{'assignee_user' | translate}}" (select)="setAssigneeUser($event)"></employee-input>
        <tags-input [ids]="tagIds" editable="true" allowClear="true" placeHolder="{{'tags' | translate}}" (select)="setTags($event)"></tags-input>
    `
})

export class TaskFilterComponent {
    @HostBinding('class.task-filter') true;
    @Output() change = new EventEmitter<any>();

    private taskStatus: string;
    private taskTypeId: string;
    private assigneeUserId: string;
    private tagIds: string[] = [];

    constructor() { }

    setTaskStatus(taskStatus: string) {
        this.taskStatus = taskStatus;
        this.updateFilter();
    }

    setTaskType(taskType: TaskType) {
        if (taskType) {
            this.taskTypeId = taskType.id;
        } else {
            this.taskTypeId = null;
        }
        this.updateFilter();
    }

    setAssigneeUser(assigneeUsers: Employee[]) {
        if (assigneeUsers.length) {
            this.assigneeUserId = assigneeUsers[0].userID;
        } else {
            this.assigneeUserId = null;
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
