import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { IReferenceState } from '../../reducers/reference.reducer';
import { TaskType } from '../../models';

@Component({
    selector: 'task-type-input',
    template: `
        <span *ngIf="!editable">
            {{taskType?.name}}
        </span>
        <div dropdown class="select task-type-input" [class.allow-clear]="allowClear" [class.has-selected]="taskType" *ngIf="editable">
            <div dropdown-toggle class="select-selection input">
                <span>{{taskType?.name}}</span>
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
                    <li class="select-option" [class.selected]="taskTypeId == m.id" *ngFor="let m of taskTypes" (click)="onSelect(m)">
                        {{m.name}}
                    </li>
                </ul>
            </div>
        </div>
    `,
    directives: [DROPDOWN_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class TaskTypeInputComponent {
    @Input() taskTypeId: string;
    @Input() placeHolder: string = '';
    @Input() editable: boolean = false;
    @Input() searchable: boolean = false;
    @Input() allowClear: boolean = false;
    @Output() select: EventEmitter<any> = new EventEmitter();
    private taskTypes: any;
    private taskType: any;
    private sub: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('reference').subscribe((state: IReferenceState) => {
            this.taskTypes = state.taskTypes;
            this.taskType = state.taskTypes.filter(it => it.id == this.taskTypeId)[0];
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
