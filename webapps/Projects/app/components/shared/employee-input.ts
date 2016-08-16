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
                    <li class="select-option" [class.selected]="ids && ids.indexOf(m.id) !=- 1" *ngFor="let m of getEmps()" (click)="add(m)">
                        {{m.name}}
                    </li>
                </ul>
            </div>
        </div>
    `
})

export class EmployeeInputComponent {
    @Input() ids: string[];
    @Input() placeHolder: string = '';
    @Input() multiple: boolean = false;
    @Input() editable: boolean = false;
    @Input() searchable: boolean = false;
    @Input() allowClear: boolean = false;
    @Output() select: EventEmitter<any> = new EventEmitter();
    private employees: Employee[] = [];
    private selectedEmps: Employee[] = [];
    private sub: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('staff').subscribe((state: IStaffState) => {
            this.employees = state.employees;
            if (this.ids) {
                this.selectedEmps = state.employees.filter(it => this.ids.indexOf(it.userID) != -1);
            }
            this.searchable = this.employees.length > 13;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getEmps() {
        if (this.multiple && this.ids) {
            return this.employees.filter(it => this.ids.indexOf(it.userID) == -1);
        } else {
            return this.employees;
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
        } else {
            this.selectedEmps = [employee];
            this.ids = [employee.id];
            document.body.click();
        }
        this.select.emit(this.selectedEmps);
    }

    remove(employee: Employee, $event) {
        if (this.multiple) {
            $event.stopPropagation();
            this.selectedEmps = this.selectedEmps.filter(it => it.id != employee.userID);
            this.ids = this.selectedEmps.map(it => it.userID);
            this.select.emit(this.selectedEmps);
        }
    }

    onScroll($event) {
        let {scrollHeight, clientHeight, scrollTop} = $event.target;
        if ((scrollHeight - clientHeight) == scrollTop) {
            console.log('scroll end');
        }
    }
}
