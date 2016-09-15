import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { StaffService } from '../../services/staff.service';
import { Organization } from '../../models';

@Component({
    selector: 'organization-input',
    template: `
        <!-- <selection
            [items]="getOrganizations()"
            [disabled]="!editable"
            (onOpen)="startLoad()">
        </selection> -->
        <span class="input organization-input" *ngIf="!editable">
            {{org?.name}}
        </span>
        <div dropdown class="select organization-input" [class.allow-clear]="allowClear" [class.has-selected]="org" *ngIf="editable" (dropdownToggle)="startLoad()">
            <div dropdown-toggle class="select-selection input">
                <span>{{org?.name}}</span>
                <span class="placeholder">{{placeHolder}}</span>
                <div class="clear" *ngIf="allowClear && org" (click)="clear($event)">
                    <i class="fa fa-times"></i>
                </div>
            </div>
            <div class="dropdown-menu select-dropdown">
                <div class="select-search" *ngIf="searchable">
                    <input placeholder="{{'search' | translate}}" #searchInput (keyup)="search($event.target.value)" />
                </div>
                <ul class="select-list scroll-shadow" (scroll)="onScroll($event)">
                    <li class="select-option" [class.selected]="org?.id == m.id" *ngFor="let m of getOrganizations()" (click)="onSelect(m)">
                        {{m.name}}
                    </li>
                </ul>
            </div>
        </div>
    `
})

export class OrganizationInputComponent {
    @Input() id: string;
    @Input() org: Organization;
    @Input() placeHolder: string = '';
    @Input() editable: boolean = false;
    @Input() searchable: boolean = false;
    @Input() allowClear: boolean = false;
    @Output() select: EventEmitter<any> = new EventEmitter();
    private organizations: Organization[] = [];
    private keyWord: string = '';
    private meta: any;
    private allLoaded = false;
    private firstLoad = true;

    constructor(private staffService: StaffService) { }

    ngOnInit() {
        if (!this.org && this.id) {
            this.staffService.fetchOrganizations({ ids: this.id }).subscribe(payload => {
                this.org = payload.organizations[0];
            })
        }
    }

    startLoad() {
        if (this.firstLoad) {
            this.loadOrganizations();
            this.firstLoad = false;
        }
    }

    loadOrganizations(page = 1) {
        this.staffService.fetchOrganizations({ page: page, keyWord: this.keyWord }).subscribe(payload => {
            this.organizations = this.organizations.concat(payload.organizations);
            this.meta = payload.meta;
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

    clear($event) {
        $event.stopPropagation();
        this.onSelect(null);
    }

    onSelect(m) {
        this.org = m;
        this.select.emit(this.org);
        document.body.click();
    }

    onScroll($event) {
        if (this.allLoaded) {
            return;
        }

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
