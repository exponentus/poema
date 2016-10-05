import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../actions';
import { StaffService } from '../staff.service';

@Component({
    selector: 'staff-index',
    template: require('./index.html')
})

export class StaffIndexComponent {
    @Input() embedded: boolean = false;
    @Input() selectable: boolean = true;
    @Input() headerVisible: boolean = true;
    @Input() titleVisible: boolean = true;
    @Input() actionsVisible: boolean = true;
    @Input() captionsVisible: boolean = true;

    private cols = [
        { caption: 'name', value: 'name', type: 'text', sort: 'desc', className: 'vw-name' },
        { caption: 'localized_name', type: 'text', value: 'localizedName', className: 'vw-localized-name' }
    ];
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
        private staffService: StaffService
    ) { }

    ngOnInit() {
        this.store.dispatch(this.environmentActions.setNavUrl('/staff', '/Staff/p?id=outline'));

        this.subs.push(this.route.params.subscribe(params => {
            let id = params['id'];
            if (id) {
                this.id = id;
                this.loadData(Object.assign({}, params, {
                    id: id,
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

        this.staffService.fetchList(this.params).subscribe(
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
}
