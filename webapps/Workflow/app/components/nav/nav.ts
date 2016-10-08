import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services';

@Component({
    selector: '[nb-nav]',
    templateUrl: './nav.html'
})

export class NavComponent {
    @Input() rootSegment: string = '/';
    @Input() outlineUrl: string = 'p?id=outline';

    private storageKey;
    private expandedEntryIds = [];
    private outline = [];
    private loading = true;

    constructor(
        private router: Router,
        private dataService: DataService
    ) { }

    ngOnInit() {
        this.storageKey = this.rootSegment.replace(/\//g, '') + '-side-tree-toggle';
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

    isActive(instruction: any[]): boolean {
        return this.router.isActive(this.router.createUrlTree(instruction), true);
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
