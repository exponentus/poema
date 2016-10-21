import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { IReferenceState } from '../../reducers/reference.reducer';
import { RequestType } from '../../models';

@Component({
    selector: 'request-type-input',
    template: `
        <selection
            class="request-type-input"
            [items]="requestTypes"
            [selectedItems]="requestType"
            [disabled]="!editable"
            [searchable]="true"
            [allowClear]="allowClear"
            [multiple]="false"
            [placeHolder]="placeHolder"
            (change)="onSelect($event)">
        </selection>
    `
})

export class RequestTypeInputComponent {
    @Input() requestType: RequestType;
    @Input() placeHolder: string = '';
    @Input() editable: boolean = false;
    @Input() allowClear: boolean = false;
    @Output() change = new EventEmitter();

    private requestTypes: RequestType[];
    private sub: any;

    constructor(private store: Store<any>) {
        this.sub = this.store.select('reference').subscribe((state: IReferenceState) => {
            this.requestTypes = state.requestTypes;
        });
    }

    ngOnInit() {
        if (!this.requestType) {
            this.onSelect(this.requestTypes.filter(it => it.name == 'implement')[0]);
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSelect(m) {
        this.requestType = m;
        this.change.emit(this.requestType);
    }
}
