import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { User } from '../../models';

@Component({
    selector: 'user-select',
    directives: [DROPDOWN_DIRECTIVES],
    pipes: [TranslatePipe],
    template: `
        <div dropdown class="select">
            <div dropdown-toggle class="select-selection input">
                <span>{{user?.userName || user?.login}}</span>
            </div>
            <div class="dropdown-menu select-dropdown">
                <ul class="select-list scroll-shadow">
                    <li class="select-option" [class.selected]="userId == m.id" *ngFor="let m of users" (click)="select(m)">
                        {{m.name || m.login}}
                    </li>
                </ul>
            </div>
        </div>
    `
})

export class UserSelectComponent {
    @Input() userId: string;
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    private users: any;
    private user: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.store.select('staff').subscribe((state: any) => {
            this.users = state.users;
            this.user = state.users.filter(it => it.id == this.userId)[0];
        });
    }

    select(m) {
        this.user = m;
        this.onSelect.emit(this.user);
    }
}
