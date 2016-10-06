import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../actions';
import { ReferenceService } from '../reference.service';

@Component({
    selector: 'reference-view',
    template: `
        <list-page
            [title]="title"
            [selectable]="true"
            [headerVisible]="true"
            [titleVisible]="true"
            [actionsVisible]="true"
            [captionsVisible]="true"
            [activeSort]="activeSort"
            [list]="list"
            [meta]="meta"
            [actions]="actions"
            [columns]="columns"
            (action)="onAction($event)"
            (refresh)="refresh($event)"
            (sort)="onSort($event)"
            (goToPage)="goToPage($event)">
        </list-page>
    `,
    host: {
        '[class.view]': 'true',
        '[class.load]': 'loading'
    }
})

export class ReferenceViewComponent {
    @Input() embedded: boolean = false;
    @Input() selectable: boolean = true;
    @Input() headerVisible: boolean = true;
    @Input() titleVisible: boolean = true;
    @Input() actionsVisible: boolean = true;
    @Input() captionsVisible: boolean = true;

    private actions = [
        { action: 'add_new', label: 'add_new' },
        { action: 'remove', label: 'remove' }
    ];
    private columns = [{ name: 'name', value: 'name', type: 'localizedName', sort: 'both', className: 'vw-name' }];
    private subs: any = [];

    list: any[];
    meta: any = {};
    keyWord: string = '';
    loading: boolean = true;
    activeSort: string = 'name:asc';
    id: string = '';
    private params: any = {};

    constructor(
        private store: Store<any>,
        private route: ActivatedRoute,
        private environmentActions: EnvironmentActions,
        private referenceService: ReferenceService
    ) { }

    ngOnInit() {
        this.subs.push(this.route.params.subscribe(params => {
            let id = params['id'];
            if (id) {
                this.id = id;
                this.loadData(Object.assign({}, params, {
                    id: id,
                    page: this.meta.page
                }));
            } else {
                this.loadData(Object.assign({}, params, {
                    id: 'region-view',
                    page: this.meta.page
                }));
            }
        }));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    // ===
    get title() {
        return this.id;
    }

    loadData(params) {
        this.loading = true;
        this.params = Object.assign({}, params, {
            'sort': this.activeSort || 'regDate:desc'
        });

        this.referenceService.fetchList(this.params).subscribe(
            payload => {
                this.loading = false;
                this.list = payload.list;
                this.meta = payload.meta;
            },
            error => console.log(error)
        );
    }

    refresh() {
        this.loadData(this.params);
    }

    goToPage(params) {
        this.loadData(params);
    }

    onSort($event) {
        this.activeSort = $event;
        this.refresh();
    }

    onAction($event) {
        alert($event.action.label)
    }
}
