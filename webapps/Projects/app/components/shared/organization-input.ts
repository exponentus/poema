import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { IStaffState } from '../../reducers/staff.reducer';
import { Organization } from '../../models';

@Component({
    selector: 'organization-input',
    template: `
        <span *ngIf="!editable">
            {{org?.name}}
        </span>
        <div dropdown class="select organization-input" *ngIf="editable">
            <div dropdown-toggle class="select-selection input">
                <span>{{org?.name}}</span>
            </div>
            <div class="dropdown-menu select-dropdown">
                <div class="select-search" *ngIf="searchable">
                    <input placeholder="{{'search' | translate}}" #searchInput (keyup)="search($event.target.value)" />
                    <!-- <button type="button" class="btn select-search-reset" *ngIf="searchInput.value" (click)="searchInput.value = '' && search('')">
                        <i class="fa fa-times"></i>
                    </button> -->
                </div>
                <ul class="select-list scroll-shadow" (scroll)="onScroll($event)">
                    <li class="select-option" [class.selected]="org?.id == m.id" *ngFor="let m of getOrganizations()" (click)="onSelect(m)">
                        {{m.name}}
                    </li>
                </ul>
            </div>
        </div>
    `,
    directives: [DROPDOWN_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class OrganizationInputComponent {
    @Input() orgId: string;
    @Input() editable: boolean = false;
    @Input() searchable: boolean = false;
    @Output() select: EventEmitter<any> = new EventEmitter();
    private organizations: any;
    private org: any;
    private keyWord: string = '';
    private sub: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('staff').subscribe((state: IStaffState) => {
            this.organizations = state.organizations;
            this.org = state.organizations.filter(it => it.id == this.orgId)[0];
            this.searchable = this.organizations.length > 13;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getOrganizations() {
        if (this.keyWord) {
            return this.organizations.filter(it => it.name.toLowerCase().indexOf(this.keyWord) != -1);
        }
        return this.organizations;
    }

    search(keyWord) {
        this.keyWord = keyWord.toLowerCase();
    }

    onSelect(m) {
        this.org = m;
        this.select.emit(this.org);
        document.body.click();
    }

    onScroll($event) {
        let {scrollHeight, clientHeight, scrollTop} = $event.target;
        if ((scrollHeight - clientHeight) == scrollTop) {
            console.log('scroll end');
        }
    }
}
