import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'user-cell',
    template: `{{ user?.login }}`
})

export class UserCellComponent {
    @Input() userId: string;
    private user: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.store.select('staff').subscribe((state: any) => {
            if (state && state.users) {
                this.user = state.users.filter(it => it.id == this.userId)[0];
            }
        });
    }
}
