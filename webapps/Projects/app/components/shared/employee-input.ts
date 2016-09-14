import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { IStaffState } from '../../reducers/staff.reducer';
import { Employee } from '../../models';

@Component({
    selector: 'employee-input',
    template: `
        <span class="input employee-input" *ngIf="!editable">
            <span [class.tag]="multiple" *ngFor="let m of selectedEmps">
                {{m?.name}}
            </span>
        </span>
        <div dropdown class="select employee-input" [class.allow-clear]="allowClear" [class.has-selected]="selectedEmps.length" *ngIf="editable">
            <div dropdown-toggle class="select-selection input">
                <span [class.tag]="multiple" *ngFor="let m of selectedEmps" (click)="remove(m, $event)">
                    {{m?.name}}
                </span>
                <span class="placeholder">{{placeHolder}}</span>
                <div class="clear" *ngIf="allowClear && selectedEmps.length" (click)="clear($event)">
                    <i class="fa fa-times"></i>
                </div>
            </div>
            <div class="dropdown-menu select-dropdown">
                <div class="select-search" *ngIf="searchable">
                    <input placeholder="{{'search' | translate}}" #searchInput (keyup)="search($event.target.value)" />
                    <button type="button" class="btn select-search-reset" *ngIf="searchInput.value" (click)="searchInput.value = '' && search('')">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
                <ul class="select-list scroll-shadow" (scroll)="onScroll($event)">
                    <li class="select-option" [class.selected]="ids && ids.indexOf(m.userID) !=- 1" *ngFor="let m of visEmployees" (click)="add(m)">
                        {{m.name}}
                    </li>
                </ul>
            </div>
        </div>
    `
})

export class EmployeeInputComponent {
    @Input('ids') set _ids(ids: string[]) {
        this.ids = ids;
        this.checkSelectedEmps();
    };
    @Input() placeHolder: string = '';
    @Input() multiple: boolean = false;
    @Input() editable: boolean = false;
    @Input() searchable: boolean = false;
    @Input() allowClear: boolean = false;
    @Output() select = new EventEmitter();
    private ids: string[] = [];
    private employees: Employee[] = [];
    private visEmployees: Employee[] = [];
    private selectedEmps: Employee[] = [];
    private sub: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('staff').subscribe((state: IStaffState) => {
            this.employees = state.employees;
            this.checkEmps();
            this.checkSelectedEmps();
            this.searchable = this.employees.length > 13;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    checkSelectedEmps() {
        if (this.ids) {
            this.selectedEmps = this.employees.filter(it => this.ids.indexOf(it.userID) != -1);
        }
    }

    checkEmps() {
        if (this.multiple && this.ids) {
            this.visEmployees = this.employees.filter(it => this.ids.indexOf(it.userID) == -1);
        } else {
            this.visEmployees = this.employees;
        }
    }

    search(keyWord) {
        console.log(keyWord);
    }

    clear($event) {
        $event.stopPropagation();
        this.selectedEmps = [];
        this.ids = [];
        this.select.emit(this.selectedEmps);
    }

    add(employee: Employee) {
        if (this.multiple) {
            this.selectedEmps.push(employee);
            this.ids = this.selectedEmps.map(it => it.userID);
            this.checkEmps();
        } else {
            this.selectedEmps = [employee];
            this.ids = [employee.userID];
            document.body.click();
        }
        this.select.emit(this.selectedEmps);
    }

    remove(employee: Employee, $event) {
        if (this.multiple) {
            $event.stopPropagation();
            this.selectedEmps = this.selectedEmps.filter(it => it.userID != employee.userID);
            this.ids = this.selectedEmps.map(it => it.userID);
            this.select.emit(this.selectedEmps);
            this.checkEmps();
        }
    }

    onScroll($event) {
        let {scrollHeight, clientHeight, scrollTop} = $event.target;
        if ((scrollHeight - clientHeight) == scrollTop) {
            console.log('scroll end');
        }
    }
}
