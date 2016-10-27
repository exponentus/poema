import { Component, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { ITasksState } from '../../reducers/tasks.reducer';
import { TaskType, Employee, Tag } from '../../models';

@Component({
    selector: 'task-filter',
    template: `
        <div class="filter-box__icon" (click)="toggle($event)"><i class="fa fa-filter"></i></div>
        <div class="filter__items">
            <task-status-input class="filter__items_item" [status]="taskStatus" editable="true" allowClear="true" placeHolder="{{'status' | translate}}" (change)="setTaskStatus($event)"></task-status-input>
            <task-type-input class="filter__items_item" [id]="taskTypeId" editable="true" allowClear="true" placeHolder="{{'task_type' | translate}}" (change)="setTaskType($event)"></task-type-input>
            <employee-input class="filter__items_item" [ids]="[assigneeUserId]" editable="true" allowClear="true" placeHolder="{{'assignee_user' | translate}}" (change)="setAssigneeUser($event)"></employee-input>
            <tags-input class="filter__items_item" [ids]="tagIds" editable="true" allowClear="true" placeHolder="{{'tags' | translate}}" (change)="setTags($event)"></tags-input>
        </div>
    `,
    host: {
        '[class.filter-box]': 'true',
        '[class.open]': 'isOpen',
        '[class.has-value]': 'isFiltered'
    }
})

export class TaskFilterComponent {
    @Output() change = new EventEmitter<any>();

    private isOpen: boolean = false;

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

    toggle() {
        this.isOpen = !this.isOpen;
    }

    get isFiltered() {
        return this.taskStatus.length || this.taskTypeId || this.assigneeUserId || this.tagIds.length;
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
