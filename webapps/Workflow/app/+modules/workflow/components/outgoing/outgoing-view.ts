import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../../actions';
import { WorkflowOutgoingService } from '../../services';

@Component({
    selector: 'outgoing-view',
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

export class OutgoingViewComponent {
    @Input() embedded: boolean = false;
    @Input() selectable: boolean = true;
    @Input() headerVisible: boolean = true;
    @Input() titleVisible: boolean = true;
    @Input() actionsVisible: boolean = true;
    @Input() captionsVisible: boolean = true;

    private actions = [];
    private columns = [];
    private subs: any = [];

    title = 'outgoing-view';
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
        private outgoingService: WorkflowOutgoingService
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
            id: 'outgoing-view',
            sort: this.activeSort || 'regDate:desc'
        });
        let typeId = 'outgoing';

        this.outgoingService.fetchOutgoings(this.params).subscribe(
            payload => {
                // this.actions = payload.data.actionBar.actions;
                this.actions = [
                    {
                        "isOn": "ON",
                        "caption": "Add",
                        "hint": "",
                        "type": "CUSTOM_ACTION",
                        "customID": "new_outgoing",
                        "url": "p?id=outgoing-form"
                    },
                    {
                        "isOn": "ON",
                        "caption": "Delete",
                        "hint": "",
                        "type": "DELETE_DOCUMENT",
                        "customID": "delete_document",
                        "url": ""
                    }
                ];
                this.columns = payload.payload.columnOptions.columns;
                let list = payload.payload.outgoings;
                this.list = list.result;
                this.meta = {
                    count: list.count,
                    keyWord: list.keyWord,
                    page: list.pageNum,
                    totalPages: list.maxPage
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
        this.outgoingService.doOutgoingAction('13123', $event.action.customID).subscribe(payload => {
            let resp = payload.objects[0];
            alert(resp.name + ' : ' + resp.value);
        });
    }
}
