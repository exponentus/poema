import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { Organization } from '../../models';

@Component({
    selector: 'customer-select',
    directives: [DROPDOWN_DIRECTIVES],
    pipes: [TranslatePipe],
    template: `
        <div dropdown class="select">
            <div dropdown-toggle class="select-selection input">
                <span>{{customer?.name}}</span>
            </div>
            <div class="dropdown-menu select-dropdown">
                <!-- <div class="select-search">
                    <input name="keyword" placeholder="{{'search' | translate}}" (keyup)="searchCustomer($event)" />
                </div> -->
                <ul class="select-list scroll-shadow">
                    <li class="select-option" [class.selected]="customer?.id == m.id" *ngFor="let m of customers" (click)="select(m)">
                        {{m.name}}
                    </li>
                </ul>
            </div>
        </div>
    `
})

export class CustomerSelectComponent {
    @Input() customerId: string;
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    private sub: any;
    private customers: any;
    private customer: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('staff').subscribe((state: any) => {
            this.customers = state.organizations;
            this.customer = state.organizations.filter(it => it.id == this.customerId)[0];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    select(m) {
        this.customer = m;
        this.onSelect.emit(this.customer);
    }
}
