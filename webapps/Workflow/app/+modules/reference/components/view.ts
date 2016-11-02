import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../actions';
import { ReferenceService } from '../reference.service';
import { NbModalService } from '../../../components/nb-modal';
import { parseResponseObjects } from '../../../utils/utils';

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
            (openUrl)="onOpenUrl($event)"
            (action)="onAction($event)"
            (refresh)="refresh($event)"
            (sort)="onSort($event)"
            (goToPage)="goToPage($event)">
        </list-page>
    `,
    host: {
        '[class.loadable]': 'true',
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

    private actions = [];
    private columns = {};
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
        private nbModalService: NbModalService,
        private referenceService: ReferenceService
    ) { }

    ngOnInit() {
        this.subs.push(this.route.params.subscribe(params => {
            let id = params['viewId'];
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
            id: this.id,
            sort: this.activeSort || 'regDate:desc'
        });
        let typeId = this.params.id.replace('-view', '').replace('-', '');

        this.referenceService.fetch(this.params).subscribe(
            payload => {
                let columnOptions = { root: [{ name: 'name', value: 'name', type: 'localizedName', sort: 'both', className: 'vw-name', valueAsClass: '' }] };
                if (payload.data.columnOptions) {
                    columnOptions = payload.data.columnOptions.columns;
                }
                let objects = parseResponseObjects(payload.objects);

                this.loading = false;
                this.list = objects[typeId] ? objects[typeId].list : [];
                this.meta = objects[typeId] ? objects[typeId].meta : {};
                this.actions = objects.actions;
                this.columns = columnOptions;
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
        this.nbModalService.createModal({
            title: $event.action.caption,
            message: $event.action.caption,
            buttons: [{
                label: 'cancel',
                click: (modal, $event) => {
                    console.log(modal, $event, this);
                    modal.close();
                }
            }, {
                label: 'yes',
                click: (modal, event) => {
                    console.log(modal, event, this);
                    alert('yes: ' + $event.action.caption);
                    modal.close(1000);
                    this.alert();
                }
            }]
        }).show().close(5000);
    }

    alert() {
        alert(this.id);
    }

    onOpenUrl($event) {
        console.log($event);
    }
}
