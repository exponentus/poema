import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'customer-cell',
    template: `{{ customer?.name }}`
})

export class CustomerCellComponent {
    @Input() customerId: string;
    private sub: any;
    private customer: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('staff').subscribe((state: any) => {
            this.customer = state.organizations.filter(it => it.id == this.customerId)[0];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
