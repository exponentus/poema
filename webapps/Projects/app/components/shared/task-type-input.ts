import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { IReferenceState } from '../../reducers/reference.reducer';
import { TaskType } from '../../models';

@Component({
    selector: 'task-type-input',
    template: `
        <span class="input task-type-input" *ngIf="!editable">
            {{taskType | localizedName}}
        </span>
        <div dropdown class="select task-type-input" [class.allow-clear]="allowClear" [class.has-selected]="taskType" *ngIf="editable">
            <div dropdown-toggle class="select-selection input">
                <span>{{taskType | localizedName}}</span>
                <span class="placeholder">{{placeHolder}}</span>
                <div class="clear" *ngIf="allowClear && taskType" (click)="clear($event)">
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
                    <li class="select-option" [class.selected]="id == m.id" *ngFor="let m of taskTypes" (click)="onSelect(m)">
                        {{m | localizedName}}
                    </li>
                </ul>
            </div>
        </div>
    `
})

export class TaskTypeInputComponent {
    @Input() id: string;
    @Input() placeHolder: string = '';
    @Input() editable: boolean = false;
    @Input() searchable: boolean = false;
    @Input() allowClear: boolean = false;
    @Output() select: EventEmitter<any> = new EventEmitter();
    private taskTypes: any;
    private taskType: any;
    private sub: any;

    constructor(
        private store: Store<any>
    ) { }

    ngOnInit() {
        this.sub = this.store.select('reference').subscribe((state: IReferenceState) => {
            this.taskTypes = state.taskTypes;
            this.taskType = state.taskTypes.filter(it => it.id == this.id)[0];
            this.searchable = this.taskTypes.length > 13;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    search(keyWord) {
        console.log(keyWord);
    }

    clear($event) {
        $event.stopPropagation();
        this.onSelect(null);
    }

    onSelect(m) {
        this.taskType = m;
        this.select.emit(this.taskType);
        document.body.click();
    }

    onScroll($event) {
        let {scrollHeight, clientHeight, scrollTop} = $event.target;
        if ((scrollHeight - clientHeight) == scrollTop) {
            console.log('scroll end');
        }
    }
}
