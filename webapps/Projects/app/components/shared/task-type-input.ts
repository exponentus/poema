import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { IReferenceState } from '../../reducers/reference.reducer';
import { TaskType } from '../../models';

@Component({
    selector: 'task-type-input',
    template: `
        <selection
            class="task-type-input"
            [items]="taskTypes"
            [selectedItems]="taskType ? [taskType] : []"
            [disabled]="!editable"
            [searchable]="true"
            [allowClear]="allowClear"
            [placeHolder]="placeHolder"
            (change)="onSelect($event)">
        </selection>
    `
})

export class TaskTypeInputComponent {
    @Input() id: string;
    @Input() placeHolder: string = '';
    @Input() editable: boolean = false;
    @Input() allowClear: boolean = false;
    @Output() select = new EventEmitter();

    private taskTypes: any = [];
    private taskType: any;
    private sub: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('reference').subscribe((state: IReferenceState) => {
            this.taskTypes = state.taskTypes;
            this.taskType = state.taskTypes.filter(it => it.id == this.id)[0];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSelect(m) {
        this.taskType = m;
        this.select.emit(this.taskType);
    }
}
