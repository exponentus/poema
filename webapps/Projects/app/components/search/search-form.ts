import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../actions/environment.actions';
import { IEnvironmentState } from '../../reducers/environment.reducer';
import { SearchService } from '../../services';

@Component({
    selector: 'search-form',
    template: `
        <form (submit)="onSubmit($event, searchInput.value)">
            <input #searchInput type="search" class="q" [class.focus]="searchInput.value" name="keyword"
                placeholder="{{'search' | translate}}" required autocomplete="off"
                (keyup)="keyup$.next($event)" (focus)="searchFocus()" (blur)="searchBlur()" />
            <button type="reset" (click)="search('')"><i class="fa fa-times"></i></button>
            <input type="submit" value="search" />
        </form>
        <div class="navbar-search-popup" *ngIf="popupOpen && models.length === 0">
            {{'ft_search_return_null' | translate}}: {{keyword}}
        </div>
        <div class="navbar-search-popup" *ngIf="popupOpen && models.length">
            <a class="navbar-search-link" [href]="m.url" (click)="openModel(m, $event)" *ngFor="let m of models">
                <span>{{m.kind | translate}}</span>
                <i class="fa fa-paperclip" *ngIf="m.hasAttachments"></i>
                <span>{{m.name || m.title}}</span>
            </a>
        </div>
    `,
    host: {
        'class': 'navbar-form navbar-search'
    }
})

export class SearchFormComponent {
    private keyup$ = new Subject<KeyboardEvent>();
    private models: any = [];
    private popupOpen = false;
    private keyword: string;
    private subs: any;

    constructor(
        private store: Store<any>,
        private router: Router,
        private environmentActions: EnvironmentActions,
        private searchService: SearchService
    ) { }

    ngOnInit() {
        this.subs = this.keyup$
            .debounceTime(250)
            .map(event => (event.target as HTMLInputElement).value)
            .distinctUntilChanged()
            .subscribe(value => this.search(value));
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    searchFocus() {
        this.store.dispatch(this.environmentActions.toggleSearch());
    }

    searchBlur() {
        this.store.dispatch(this.environmentActions.hideNav());
    }

    search(value) {
        if (value) {
            this.searchService.search({ keyword: value, page: 1, limit: 5 }).subscribe(payload => {
                this.models = payload.payload.ft_search_result.result || [];
                this.keyword = payload.payload.keyword;
                this.popupOpen = true;
            });
        } else {
            this.reset();
        }
    }

    reset(next: boolean = true) {
        this.models = [];
        this.keyword = ''
        this.popupOpen = false;
    }

    onSubmit($event, value) {
        this.reset();
        $event.target.reset();

        this.router.navigate(['search'], {
            queryParams: {
                keyword: value,
                page: 1
            }
        });
    }

    openModel(model, $event) {
        $event.preventDefault();

        if (model.kind === 'project') {
            this.router.navigate(['/projects', model.id]);
        } else if (model.kind === 'task') {
            this.router.navigate(['/task', model.id]);
        } else if (model.kind === 'request') {
            this.router.navigate(['/requests', model.id]);
        }
    }
}
