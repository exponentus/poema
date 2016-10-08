import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { StaffService } from '../../services/staff.service';
import { Organization } from '../../models';

@Component({
    selector: 'organization-input',
    template: `
        <selection
            class="organization-input"
            [items]="organizations"
            [selectedItems]="org? [org] : []"
            [disabled]="!editable"
            [searchable]="true"
            [allowClear]="allowClear"
            [placeHolder]="placeHolder"
            (load)="load($event)"
            (change)="onSelect($event)">
        </selection>
    `
})

export class OrganizationInputComponent {
    @Input() id: string;
    @Input() org: Organization;
    @Input() placeHolder: string = '';
    @Input() editable: boolean = false;
    @Input() allowClear: boolean = false;
    @Output() change = new EventEmitter();

    private organizations: Organization[] = [];
    private meta: any = { page: 0, totalPages: 1 };
    private allLoaded = false;
    private firstLoad = true;

    constructor(private staffService: StaffService) { }

    ngOnInit() {
        if (!this.org && this.id) {
            this.staffService.fetchOrganizations({ ids: this.id }).subscribe(payload => {
                this.org = payload.organizations[0];
            });
        }
    }

    load($load) {
        if ($load.first && this.firstLoad) {
            this.loadOrganizations();
            this.firstLoad = false;
        } else if ($load.next && !this.allLoaded) {
            if (this.meta && this.meta.page < this.meta.totalPages) {
                this.loadOrganizations(this.meta.page + 1);
            } else {
                this.allLoaded = true;
            }
        } else if (typeof $load.search === 'string') {
            this.loadOrganizations(1, $load.search, true);
        }
    }

    loadOrganizations(page = 1, keyWord = '', isSearch = false) {
        this.staffService.fetchOrganizations({ page: page, keyword: keyWord }).subscribe(payload => {
            if (isSearch) {
                this.organizations = payload.organizations;
            } else {
                this.organizations = this.organizations.concat(payload.organizations);
            }
            this.meta = payload.meta;
        });
    }

    onSelect(m) {
        this.org = m;
        this.change.emit(this.org);
    }
}
