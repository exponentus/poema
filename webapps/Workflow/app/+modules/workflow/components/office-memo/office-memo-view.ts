import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../../actions';
import { WorkflowOfficeMemoService } from '../../services';

@Component({
    selector: 'office-memo-view',
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

export class OfficeMemoViewComponent {
    @Input() embedded: boolean = false;
    @Input() selectable: boolean = true;
    @Input() headerVisible: boolean = true;
    @Input() titleVisible: boolean = true;
    @Input() actionsVisible: boolean = true;
    @Input() captionsVisible: boolean = true;

    private actions = [];
    private columns = [];
    private subs: any = [];

    title = 'office-memo-view';
    list: any[];
    meta: any = {};
    keyWord: string = '';
    loading: boolean = true;
    activeSort: string = '';
    private params: any = {};

    constructor(
        private store: Store<any>,
        private route: ActivatedRoute,
        private environmentActions: EnvironmentActions,
        private officeMemoService: WorkflowOfficeMemoService
    ) { }

    ngOnInit() {
        this.subs.push(this.route.params.subscribe(params => {
            this.loadData(Object.assign({}, params, {
                page: this.meta.page
            }));
        }));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    loadData(params) {
        this.loading = true;
        this.params = Object.assign({}, params, {
            id: 'officememo-view',
            sort: this.activeSort || 'regDate:desc'
        });
        let typeId = 'officememo';

        this.officeMemoService.fetchOfficeMemos(this.params).subscribe(
            payload => {
                this.title = payload.payload.title;
                this.actions = payload.payload.actionBar.actions;
                this.columns = payload.payload.columnOptions.columns;
                let view = payload.payload.view;
                this.list = view.result;
                this.meta = {
                    count: view.count,
                    keyWord: view.keyWord,
                    page: view.pageNum,
                    totalPages: view.maxPage
                };
                this.loading = false;
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
        this.officeMemoService.doOfficeMemoAction('123', $event.action.customID).subscribe(payload => {
            let resp = payload.objects[0];
            alert(resp.name + ' : ' + resp.value);
        });
    }
}
