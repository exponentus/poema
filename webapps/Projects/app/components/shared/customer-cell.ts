import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'customer-cell',
    template: `{{ customer?.name }}`
})

export class CustomerCellComponent {
    @Input() customerId: string;
    private customer: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.store.select('staff').subscribe((state: any) => {
            this.customer = state.organizations.filter(it => it.id == this.customerId)[0];
        });
    }
}
