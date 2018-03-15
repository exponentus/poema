import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AppStateService, DataService } from '@nb/core';
import { IEntity, IColumnOptions } from '@nb/core';
import { createApiUrl } from '@nb/core';

@Component({
    selector: 'wf-document-hierarchy',
    templateUrl: './document-hierarchy.html'
})
export class DocumentHierarchyComponent {
    @Input() viewColumnOptions: IColumnOptions;
    @Input() model: IEntity;
    @Input('disabledIds') set _disabledIds(_disabledIds: string[]) { }
    view: any = {};
    expandedIds: string[] = [];
    disabledIds: string[] = [];
    error = null;

    constructor(
        private router: Router,
        private appStateService: AppStateService,
        private dataService: DataService) {
    }

    ngOnInit() {
        this.expandedIds.push(this.model.id);
        this.appStateService.setViewId(`view-response-${this.model.id}`);

        let viewState = this.appStateService.getViewState();
        if (viewState) {
            this.expandedIds = viewState.expandedIds || [];
        } else {
            this.expandedIds = [];
        }

        this.fetchView();
    }

    fetchView() {
        return this.dataService.apiGet(`${createApiUrl(this.model.url)}/responses`)
            .map(response => {
                this.viewColumnOptions = response.payload.viewpage.columnOptions;
                this.view['result'] = response.payload.viewpage.result;
                this.view['meta'] = {
                    count: response.payload.viewpage.count,
                    keyword: response.payload.viewpage.keyword,
                    page: response.payload.viewpage.pageNum,
                    totalPages: response.payload.viewpage.maxPage
                };

            })
            .catch(error => {
                return error;
            }).subscribe();
    }

    onToggleExpanded(id: string) {
        this.appStateService.viewToggleExpanded(id);
    }

    onOpenModel(model: any) {
        this.router.navigateByUrl(model.url);
    }
}
