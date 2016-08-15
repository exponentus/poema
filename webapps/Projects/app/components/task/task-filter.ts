import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';

import { Task, TaskType, User, Tag } from '../../models';

@Component({
    selector: 'task-filter',
    template: `
        <div class="task-filter__icon">
            <i class="fa fa-filter"></i>
        </div>
        <task-type-input [taskTypeId]="taskTypeId" editable="true" allowClear="true" placeHolder="{{'task_type' | translate}}" (select)="setTaskType($event)"></task-type-input>
        <user-input editable="true" allowClear="true" placeHolder="{{'assignee_user' | translate}}" (select)="setAssigneeUser($event)"></user-input>
        <tags-input [tagIds]="tagIds" editable="true" allowClear="true" placeHolder="{{'tags' | translate}}" (select)="setTags($event)"></tags-input>
    `
})

export class TaskFilterComponent {
    @HostBinding('class.task-filter') true;
    @Output() change = new EventEmitter<any>();

    private taskTypeId: string;
    private assigneeUserId: string;
    private tagIds: string[] = [];

    constructor() { }

    setTaskType(taskType: TaskType) {
        if (taskType) {
            this.taskTypeId = taskType.id;
        } else {
            this.taskTypeId = null;
        }
        this.updateFilter();
    }

    setAssigneeUser(assigneeUsers: User[]) {
        if (assigneeUsers.length) {
            this.assigneeUserId = assigneeUsers[0].id;
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
            taskTypeId: this.taskTypeId,
            assigneeUserId: this.assigneeUserId,
            tagIds: this.tagIds
        });
    }
}
