import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { IEnvironmentState } from '../../reducers/environment.reducer';
import { SearchService } from '../../services';

@Component({
    selector: 'search-view',
    template: `
        <list-page
            class="search-view"
            title="ft_search_result"
            emptyMessage="ft_search_return_null"
            [selectable]="false"
            [headerVisible]="true"
            [titleVisible]="true"
            [actionsVisible]="true"
            [captionsVisible]="false"
            [activeSort]="activeSort"
            [list]="models"
            [meta]="meta"
            [actions]="actions"
            [columns]="columns"
            (openModel)="onOpenModel($event)"
            (action)="onAction($event)"
            (refresh)="refresh($event)"
            (goToPage)="goToPage($event)">
        </list-page>
    `
})

export class SearchViewComponent {
    private models: any = [];
    private meta: any = {};
    private keyword: string;
    private redirectUrl: string;
    private actions = [{
        caption: 'back_to_doc_list',
        customID: 'back_to_doc_list',
        type: 'CUSTOM_ACTION'
    }];
    private columns = {
        root: [{ name: 'name', value: 'name', type: 'localizedName', className: 'vw-name', valueAsClass: '' }],
        project: [
            { value: 'kind', type: 'translate', className: 'vw-text' },
            { value: 'name', type: 'text', className: 'vw-text' },
            { value: 'regDate', type: 'date', className: 'vw-text' }
        ],
        task: [
            { value: 'kind', type: 'translate', className: 'vw-text' },
            { value: 'regNumber', type: 'text', className: 'vw-text' },
            { value: 'title', type: 'text', className: 'vw-text' },
            { value: 'regDate', type: 'date', className: 'vw-text' }
        ],

    };
    private subs: any = [];

    constructor(
        private store: Store<any>,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private searchService: SearchService
    ) { }

    ngOnInit() {
        this.subs.push(this.store.select('environment').subscribe((state: IEnvironmentState) => {
            this.redirectUrl = state.redirectUrl;
        }));

        this.subs.push(this.activatedRoute.queryParams.subscribe(param => {
            this.searchService.search(param).subscribe(payload => {
                this.models = payload.payload.ft_search_result.result || [];
                this.keyword = payload.payload.keyword;
            });
        }));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    close() {
        this.router.navigateByUrl(this.redirectUrl);
    }

    onOpenModel(model) {
        if (model.kind === 'project') {
            this.router.navigate(['/projects', model.id]);
        } else if (model.kind === 'task') {
            this.router.navigate(['/task', model.id]);
        } else if (model.kind === 'request') {
            this.router.navigate(['/requests', model.id]);
        }
    }

    onAction($event) {
        this.close();
    }
}
