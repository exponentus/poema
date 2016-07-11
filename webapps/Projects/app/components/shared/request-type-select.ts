import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { Request } from '../../models';

@Component({
    selector: 'request-type-select',
    directives: [DROPDOWN_DIRECTIVES],
    template: `
        <div dropdown class="select">
            <div dropdown-toggle class="select-selection input">
                <span>{{requestType?.name}}</span>
            </div>
            <div class="dropdown-menu select-dropdown">
                <ul class="select-list scroll-shadow">
                    <li class="select-option" [class.selected]="requestTypeId == m.id" *ngFor="let m of requestTypes" (click)="select(m)">
                        {{m.name}}
                    </li>
                </ul>
            </div>
        </div>
    `
})

export class RequestTypeSelectComponent {
    @Input() requestTypeId: string;
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    private sub: any;
    private requestTypes: any;
    private requestType: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('reference').subscribe((state: any) => {
            this.requestTypes = state.requestTypes;
            this.requestType = state.requestTypes.filter(it => it.id == this.requestTypeId)[0];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    select(m) {
        this.requestType = m;
        this.onSelect.emit(this.requestType);
    }
}
