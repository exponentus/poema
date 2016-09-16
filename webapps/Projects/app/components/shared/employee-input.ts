import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { IStaffState } from '../../reducers/staff.reducer';
import { Employee } from '../../models';

@Component({
    selector: 'employee-input',
    template: `
        <selection
            class="employee-input"
            [items]="employees"
            [selectedItems]="selectedEmps"
            [disabled]="!editable"
            [searchable]="true"
            [allowClear]="allowClear"
            [multiple]="multiple"
            [placeHolder]="placeHolder"
            (change)="onSelect($event)">
        </selection>
    `
})

export class EmployeeInputComponent {
    @Input() ids: string[] = [];
    @Input() placeHolder: string = '';
    @Input() multiple: boolean = false;
    @Input() editable: boolean = false;
    @Input() allowClear: boolean = false;
    @Output() select = new EventEmitter();

    private employees: Employee[] = [];
    private selectedEmps: Employee[] = [];
    private sub: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('staff').subscribe((state: IStaffState) => {
            this.employees = state.employees;
            if (this.ids) {
                this.selectedEmps = this.employees.filter(it => this.ids.indexOf(it.userID) != -1);
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSelect(selectedEmps) {
        this.select.emit(selectedEmps);
    }
}
