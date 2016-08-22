import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';

@Component({
    selector: 'task-status-input',
    template: `
        <span class="input task-status-input" *ngIf="!editable">
            {{status | text:'L' | translate}}
        </span>
        <div dropdown class="select task-status-input" [class.allow-clear]="allowClear" [class.has-selected]="status" *ngIf="editable">
            <div dropdown-toggle class="select-selection input">
                <span class="status-{{status | text:'L'}}">{{status | text:'L' | translate}}</span>
                <span class="placeholder">{{placeHolder}}</span>
                <div class="clear" *ngIf="allowClear && status" (click)="clear($event)">
                    <i class="fa fa-times"></i>
                </div>
            </div>
            <div class="dropdown-menu select-dropdown">
                <ul class="select-list">
                    <li class="select-option" [class.selected]="status == m" *ngFor="let m of statusList" (click)="onSelect(m)">
                        <div class="task-status status-{{m | text:'L'}}">{{m | text:'L' | translate}}</div>
                    </li>
                </ul>
            </div>
        </div>
    `
})

export class TaskStatusInputComponent {
    @Input() status: string = '';
    @Input() placeHolder: string = '';
    @Input() editable: boolean = false;
    @Input() allowClear: boolean = false;
    @Output() select: EventEmitter<any> = new EventEmitter();

    private statusList: string[] = ['PROCESSING', 'COMPLETED', 'WAITING', 'CANCELLED', 'PENDING', 'OPEN'];

    constructor() { }

    clear($event) {
        $event.stopPropagation();
        this.onSelect('');
    }

    onSelect(m) {
        this.status = m;
        this.select.emit(this.status);
        document.body.click();
    }
}
