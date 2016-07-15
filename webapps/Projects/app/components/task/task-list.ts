import { Component, Input, Output } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { UserCellComponent } from '../shared/user-cell';
import { TagsCellComponent } from '../shared/tags-cell';
import { TextTransformPipe, DateFormatPipe } from '../../pipes';
import { Task } from '../../models';

@Component({
    selector: 'task-list',
    template: require('./templates/task-list.html'),
    directives: [ROUTER_DIRECTIVES, UserCellComponent, TagsCellComponent],
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe]
})

export class TaskListComponent {
    @Input('tasks') set _tasks(tasks: Task[]) {
        this.tasks = tasks;
        this.selectedIds = [];
        this.isSelectedAll = false;
    }
    @Input() showHeader: boolean = true;

    private tasks: Task[];
    private selectedIds: string[] = [];
    private isSelectedAll: boolean = false;

    isSelected(id: string) {
        return this.selectedIds.indexOf(id) != -1;
    }

    toggleSelectAll() {
        if (this.selectedIds.length) {
            this.selectedIds = [];
            this.isSelectedAll = false;
        } else {
            this.selectedIds = this.tasks.map(it => it.id);
            this.isSelectedAll = true;
        }
    }

    toggleSelected(id: string) {
        let index = this.selectedIds.indexOf(id);
        if (index != -1) {
            this.selectedIds.push(id);
        } else {
            this.selectedIds.splice(index);
            if (!this.selectedIds.length) {
                this.isSelectedAll = false;
            }
        }
    }
}
