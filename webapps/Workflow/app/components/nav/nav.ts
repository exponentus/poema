import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { IEnvironmentState } from '../../reducers/environment.reducer';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Component({
    selector: '[nb-nav]',
    template: require('./nav.html')
})

export class NavComponent {
    private outline = [];
    private loading = true;
    private rootSegment = '/';
    private sub: any;

    constructor(
        private router: Router,
        private http: Http,
        private store: Store<any>
    ) {
        this.sub = store.select('environment').subscribe((state: IEnvironmentState) => {
            this.rootSegment = state.rootSegment;
            this.loadNav(state.navUrl);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    loadNav(navUrl: string) {
        this.loading = true;
        this.http.get(navUrl, { headers: HEADERS })
            .retry(3)
            .map(response => response.json())
            .map(({objects}) => objects.filter(it => it.outlines && it.entries))
            .subscribe(outline => {
                this.loading = false;
                this.outline = outline;
            });
    }

    isActive(instruction: any[]): boolean {
        return this.router.isActive(this.router.createUrlTree(instruction), true);
    }
}