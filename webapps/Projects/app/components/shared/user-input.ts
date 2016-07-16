import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { IStaffState } from '../../reducers/staff.reducer';
import { User } from '../../models';

@Component({
    selector: 'user-input',
    template: `
        <span *ngIf="!editable">
            <span [class.tag]="multiple" *ngFor="let m of selectedUsers">
                {{m?.userName || m?.login}}
            </span>
        </span>
        <div dropdown class="select user-input" *ngIf="editable">
            <div dropdown-toggle class="select-selection input">
                <span [class.tag]="multiple" *ngFor="let m of selectedUsers" (click)="remove(m, $event)">
                    {{m?.userName || m?.login}}
                </span>
            </div>
            <div class="dropdown-menu select-dropdown">
                <div class="select-search" *ngIf="searchable">
                    <input placeholder="{{'search' | translate}}" #searchInput (keyup)="search($event.target.value)" />
                    <button type="button" class="btn select-search-reset" *ngIf="searchInput.value" (click)="searchInput.value = '' && search('')">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
                <ul class="select-list scroll-shadow" (scroll)="onScroll($event)">
                    <li class="select-option" [class.selected]="userIds && userIds.indexOf(m.id) !=- 1" *ngFor="let m of getUsers()" (click)="add(m)">
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
    @Input() userIds: string[];
    @Input() multiple: boolean = false;
    @Input() editable: boolean = false;
    @Input() searchable: boolean = false;
    @Output() select: EventEmitter<any> = new EventEmitter();
    private users: User[] = [];
    private selectedUsers: User[] = [];
    private sub: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('staff').subscribe((state: IStaffState) => {
            this.users = state.users;
            if (this.userIds) {
                this.selectedUsers = state.users.filter(it => this.userIds.indexOf(it.id) != -1);
            }
            this.searchable = this.users.length > 13;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getUsers() {
        if (this.multiple && this.userIds) {
            return this.users.filter(it => this.userIds.indexOf(it.id) == -1);
        } else {
            return this.users;
        }
    }

    search(keyWord) {
        console.log(keyWord);
    }

    add(user: User) {
        if (this.multiple) {
            this.selectedUsers.push(user);
            this.userIds = this.selectedUsers.map(it => it.id);
        } else {
            this.selectedUsers = [user];
            this.userIds = [user.id];
            document.body.click();
        }
        this.select.emit(this.selectedUsers);
    }

    remove(user: User, $event) {
        if (this.multiple) {
            $event.stopPropagation();
            this.selectedUsers = this.selectedUsers.filter(it => it.id != user.id);
            this.userIds = this.selectedUsers.map(it => it.id);
            this.select.emit(this.selectedUsers);
        }
    }

    onScroll($event) {
        let {scrollHeight, clientHeight, scrollTop} = $event.target;
        if ((scrollHeight - clientHeight) == scrollTop) {
            console.log('scroll end');
        }
    }
}
