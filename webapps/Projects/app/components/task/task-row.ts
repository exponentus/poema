import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { UserCellComponent } from '../shared/user-cell';
import { TagsCellComponent } from '../shared/tags-cell';
import { TextTransformPipe, DateFormatPipe } from '../../pipes';
import { Task } from '../../models/task';

@Component({
    selector: 'task-row',
    template: require('./templates/task-row.html'),
    directives: [ROUTER_DIRECTIVES, UserCellComponent, TagsCellComponent],
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe]
})

export class TaskRowComponent {
    @Input() task: Task;
    selected: boolean = false;

    toggleSelected() {
        this.selected = !this.selected;
    }
}
