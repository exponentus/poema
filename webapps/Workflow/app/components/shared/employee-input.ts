import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { IStaffState } from '../../+modules/staff/staff.reducer';
import { Employee } from '../../+modules/staff/models';

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
    @Input('ids') set _ids(ids: string[]) {
        this.ids = ids;
        this.checkSelected();
    };
    @Input() placeHolder: string = '';
    @Input() multiple: boolean = false;
    @Input() editable: boolean = false;
    @Input() allowClear: boolean = false;
    @Output() change = new EventEmitter();

    private ids: string[] = [];
    private employees: Employee[] = [];
    private selectedEmps: Employee[] = [];
    private sub: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('staff').subscribe((state: IStaffState) => {
            this.employees = state.employees;
            this.checkSelected();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    checkSelected() {
        if (this.ids && this.employees) {
            this.selectedEmps = this.employees.filter(it => this.ids.indexOf(it.userID) != -1);
        }
    }

    onSelect(selectedEmps) {
        this.change.emit(selectedEmps);
    }
}
