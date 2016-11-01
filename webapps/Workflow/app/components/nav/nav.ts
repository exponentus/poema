import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../actions';
import { DataService } from '../../services';

@Component({
    selector: '[nb-nav]',
    templateUrl: './nav.html'
})

export class NavComponent {
    @Input() module: string = '';
    @Input() outlineUrl: string = 'p?id=outline';

    private storageKey;
    private expandedEntryIds = [];
    private outline = [];
    private loading = true;

    constructor(
        private store: Store<any>,
        private environmentActions: EnvironmentActions,
        private dataService: DataService
    ) { }

    ngOnInit() {
        this.storageKey = this.module + '-side-tree-toggle';
        let oreo = localStorage.getItem(this.storageKey);
        this.expandedEntryIds = oreo ? oreo.split(',') : [];

        this.loadNav(this.outlineUrl);
    }

    loadNav(url: string) {
        this.loading = true;
        this.dataService.get(url, {}, 2)
            .map(({objects}) => objects.filter(it => it.outlines && it.entries))
            .subscribe(outline => {
                this.loading = false;
                this.outline = outline;
            });
    }

    onNavClick() {
        this.store.dispatch(this.environmentActions.hideNav());
    }

    toggleCollapsible(id) {
        let index = this.expandedEntryIds.indexOf(id);
        if (index > -1) {
            this.expandedEntryIds.splice(index, 1);
        } else {
            this.expandedEntryIds.push(id);
        }

        localStorage.setItem(this.storageKey, this.expandedEntryIds.join(','));
    }
}
