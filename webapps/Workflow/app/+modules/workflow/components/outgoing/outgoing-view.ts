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
    private columns = [
        { name: 'reg_number', value: 'regNumber', type: 'text', sort: 'both', className: 'vw-reg-number' },
        { name: 'att', value: 'hasAttachment', type: 'icon', className: 'vw-icon' },
        { name: 'applied_reg_date', value: 'appliedRegDate', type: 'date', className: 'vw-reg-date' },
        { name: 'doc_language', value: 'docLanguage', type: 'localizedName', className: 'vw-name' },
        { name: 'doc_type', value: 'docType', type: 'localizedName', className: 'vw-name' },
        { name: 'sender', value: 'sender', type: 'localizedName', className: 'vw-name' },
        { name: 'sender_applied_reg_date', value: 'senderAppliedRegDate', type: 'date', className: 'vw-reg-date' },
        { name: 'summary', value: 'summary', type: 'text', className: 'vw-content' }
    ];
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
            this.loadData(Object.assign({}, params, { page: this.meta.page }));
        }));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    loadData(params) {
        this.loading = true;
        this.params = Object.assign({}, params, {
            'sort': this.activeSort || 'regDate:desc'
        });
        let typeId = 'outgoing';

        this.outgoingService.fetchOutgoings(this.params).subscribe(
            payload => {
                this.loading = false;
                this.list = payload[typeId] ? payload[typeId].list : [];
                this.meta = payload[typeId] ? payload[typeId].meta : {};
                this.actions = payload.actions;
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
        this.outgoingService.doAction($event.action.customID).subscribe(payload => {
            let resp = payload.objects[0];
            alert(resp.name + ' : ' + resp.value);
        });
    }
}
