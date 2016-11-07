import { Component, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { ITasksState } from '../../reducers/tasks.reducer';
import { TaskType, Employee, Tag } from '../../models';

@Component({
    selector: 'task-filter',
    template: `
        <div class="filter-box__icon" (click)="toggle($event)"><i class="fa fa-filter"></i></div>
        <div class="filter__items">
            <task-status-input class="filter__items_item"
                [status]="taskStatus"
                editable="true"
                allowClear="true"
                placeHolder="{{'status' | translate}}"
                (change)="setTaskStatus($event)"></task-status-input>
            <selection
                class="filter__items_item"
                [selectedItems]="taskType"
                allowClear="true"
                [searchable]="true"
                placeHolder="{{'task_type' | translate}}"
                url="/Reference/p?id=tasktypes"
                (change)="setTaskType($event)">
            </selection>
            <selection
                class="filter__items_item"
                [selectedItems]="assigneeUser"
                allowClear="true"
                url="/Staff/p?id=employees"
                [searchable]="true"
                placeHolder="{{'assignee_user' | translate}}"
                (change)="setAssigneeUser($event)">
            </selection>
            <tags-input class="filter__items_item"
                [selectedTags]="tags"
                editable="true"
                allowClear="true"
                placeHolder="{{'tags' | translate}}"
                withHidden="true"
                (change)="setTags($event)"></tags-input>
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
    private taskType: any = '';
    private assigneeUser: any = '';
    private tags: any[] = [];

    private sub: any;

    constructor(
        private store: Store<any>
    ) {
        this.sub = this.store.select('tasks').subscribe((state: ITasksState) => {
            if (state) {
                this.taskStatus = state.filter.taskStatus;
                this.taskType = state.filter.taskType;
                this.assigneeUser = state.filter.assigneeUser;
                this.tags = state.filter.tags;
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
        return this.taskStatus || this.taskType || this.assigneeUser || this.tags.length;
    }

    setTaskStatus(taskStatus: string) {
        this.taskStatus = taskStatus || '';
        this.updateFilter();
    }

    setTaskType(taskType: TaskType) {
        this.taskType = taskType || '';
        this.updateFilter();
    }

    setAssigneeUser(assigneeUser: Employee) {
        this.assigneeUser = assigneeUser || '';
        this.updateFilter();
    }

    setTags(tags: Tag[]) {
        this.tags = tags;
        this.updateFilter();
    }

    updateFilter() {
        this.change.emit({
            taskStatus: this.taskStatus,
            taskType: this.taskType,
            assigneeUser: this.assigneeUser,
            tags: this.tags
        });
    }
}
