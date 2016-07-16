import { Component, Input, Output, AfterContentInit, EventEmitter } from '@angular/core';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { StaffService } from '../../services/staff.service';
import { Organization } from '../../models';

@Component({
    selector: 'organization-input',
    template: `
        <span *ngIf="!editable">
            {{org?.name}}
        </span>
        <div dropdown class="select organization-input" *ngIf="editable" (dropdownToggle)="loadOrganizations()">
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
    @Input() org: Organization;
    @Input() editable: boolean = false;
    @Input() searchable: boolean = false;
    @Output() select: EventEmitter<any> = new EventEmitter();
    private organizations: Organization[] = [];
    private keyWord: string = '';
    private meta: any;
    private allLoaded = false;

    constructor(private staffService: StaffService) { }

    ngAfterContentInit() {
        if (!this.org && this.orgId) {
            this.staffService.fetchOrganizations({ ids: this.orgId }).subscribe(action => {
                this.org = action.payload.organizations[0];
            })
        }
    }

    loadOrganizations(page = 1) {
        if (this.allLoaded || this.meta && (page <= this.meta.page)) {
            console.log(this.meta.page, page);
            return;
        }

        this.staffService.fetchOrganizations({ page: page, keyWord: this.keyWord }).subscribe(action => {
            this.organizations = this.organizations.concat(action.payload.organizations);
            this.meta = action.payload.meta;
            if (!this.searchable) {
                this.searchable = this.organizations.length > 13;
            }
        });
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
            if (this.meta && this.meta.page < this.meta.totalPages) {
                this.loadOrganizations(this.meta.page + 1);
            } else {
                this.allLoaded = true;
            }
        }
    }
}
