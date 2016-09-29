import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
    selector: 'task-status-input',
    template: `
        <selection
            class="task-status-input"
            [items]="statusList"
            [selectedItems]="status ? status : []"
            [disabled]="!editable"
            [searchable]="true"
            [allowClear]="allowClear"
            [placeHolder]="placeHolder"
            (change)="onSelect($event)">
        </selection>
    `
})

export class TaskStatusInputComponent {
    @Input('status') set _status(status: string) {
        this.statusName = status;
        this.status = this.statusList.filter(it => it.id === status);
    };
    @Input() placeHolder: string = '';
    @Input() editable: boolean = false;
    @Input() allowClear: boolean = false;
    @Output() select: EventEmitter<any> = new EventEmitter();

    private status: any = {};
    private statusName: string = '';
    private statusList: any[] = [];

    constructor(private translate: TranslateService) {
        translate.get(['processing', 'completed', 'waiting', 'cancelled', 'pending', 'open']).subscribe(t => {
            this.statusList = [
                { id: 'PROCESSING', name: t.processing, _itemClass: 'status-processing' },
                { id: 'COMPLETED', name: t.completed, _itemClass: 'status-completed' },
                { id: 'WAITING', name: t.waiting, _itemClass: 'status-waiting' },
                { id: 'CANCELLED', name: t.cancelled, _itemClass: 'status-cancelled' },
                { id: 'PENDING', name: t.pending, _itemClass: 'status-pending' },
                { id: 'OPEN', name: t.open, _itemClass: 'status-open' }
            ];
            this.status = this.statusList.filter(it => it.id === this.statusName);
        });
    }

    onSelect(m) {
        this.status = m;
        this.select.emit(this.status ? this.status.id : '');
    }
}
