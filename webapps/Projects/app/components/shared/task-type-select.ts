import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { TaskType } from '../../models';

@Component({
    selector: 'task-type-select',
    directives: [DROPDOWN_DIRECTIVES],
    template: `
        <div dropdown class="select">
            <div dropdown-toggle class="select-selection input">
                <span>{{taskType?.name}}</span>
            </div>
            <div class="dropdown-menu select-dropdown">
                <ul class="select-list scroll-shadow">
                    <li class="select-option" [class.selected]="taskTypeId == m.id" *ngFor="let m of taskTypes" (click)="select(m)">
                        {{m.name}}
                    </li>
                </ul>
            </div>
        </div>
    `
})

export class TaskTypeSelectComponent {
    @Input() taskTypeId: string;
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    private sub: any;
    private taskTypes: any;
    private taskType: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('reference').subscribe((state: any) => {
            this.taskTypes = state.taskTypes;
            this.taskType = state.taskTypes.filter(it => it.id == this.taskTypeId)[0];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    select(m) {
        this.taskType = m;
        this.onSelect.emit(this.taskType);
    }
}
