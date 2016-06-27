import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TaskType } from '../../models';

@Component({
    selector: 'task-type-select',
    template: 'task-type-select'
})

export class TaskTypeSelectComponent {
    @Input() customerId: string;
    @Output() onSelect: EventEmitter<any> = new EventEmitter();

}
