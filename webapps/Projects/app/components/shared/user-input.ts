import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { User } from '../../models';

@Component({
    selector: 'user-input',
    template: `
        <span *ngIf="!editable">
            {{user?.userName || user?.login}}
        </span>
        <div dropdown class="select user-input" *ngIf="editable">
            <div dropdown-toggle class="select-selection input">
                <span>{{user?.userName || user?.login}}</span>
            </div>
            <div class="dropdown-menu select-dropdown">
                <div class="select-search" *ngIf="searchable">
                    <input placeholder="{{'search' | translate}}" #searchInput (keyup)="search($event.target.value)" />
                    <button type="button" class="btn select-search-reset" *ngIf="searchInput.value" (click)="searchInput.value = ''">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
                <ul class="select-list scroll-shadow" (scroll)="onScroll($event)">
                    <li class="select-option" [class.selected]="userId == m.id" *ngFor="let m of users" (click)="onSelect(m)">
                        {{m.name || m.login}}
                    </li>
                </ul>
            </div>
        </div>
    `,
    directives: [DROPDOWN_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class UserInputComponent {
    @Input() userId: string;
    @Input() editable: boolean = false;
    @Input() searchable: boolean = true;
    @Output() select: EventEmitter<any> = new EventEmitter();
    private users: any;
    private user: any;
    private sub: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('staff').subscribe((state: any) => {
            this.users = state.users;
            this.user = state.users.filter(it => it.id == this.userId)[0];
            this.searchable = this.users.length > 13;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    search(keyWord) {
        console.log(keyWord);
    }

    onSelect(m) {
        this.user = m;
        this.select.emit(this.user);
        document.body.click();
    }

    onScroll($event) {
        let {scrollHeight, clientHeight, scrollTop} = $event.target;
        console.log(scrollHeight - clientHeight, scrollTop);
    }
}
