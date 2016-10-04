import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import { AppService } from '../../services/app.service';
import { EnvironmentActions } from '../../actions/environment.actions';
import { IEnvironmentState } from '../../reducers/environment.reducer';
import { User } from '../../models/user';

@Component({
    selector: 'navbar',
    template: require('./navbar.html')
})

export class NavbarComponent {
    @Input() user: User;
    keyup$ = new Subject<KeyboardEvent>();
    headerTitle: string = 'Projects';
    logoUrl: string = 'img/logo.png';
    keyWord: string = '';
    private subs: any = [];

    constructor(
        private store: Store<any>,
        private environmentActions: EnvironmentActions,
        private appService: AppService
    ) {
        this.subs.push(this.store.select('environment').subscribe((state: IEnvironmentState) => {
            this.keyWord = state.keyWord;
        }));
    }

    ngOnInit() {
        this.keyup$
            .debounceTime(250)
            .map(event => (event.target as HTMLInputElement).value)
            .distinctUntilChanged()
            .subscribe(value => this.search(value));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    get workspaceUrl() {
        return this.appService.workspaceUrl;
    }

    searchFocus() {
        this.store.dispatch(this.environmentActions.toggleSearch());
    }

    searchBlur() {
        this.store.dispatch(this.environmentActions.hideNav());
    }

    search(value) {
        this.store.dispatch(this.environmentActions.search(value));
    }

    toggleNav() {
        this.store.dispatch(this.environmentActions.toggleNav());
    }

    logout(event) {
        event.preventDefault();
        // this.loggedUser = null;
       //  window.location.href = 'Logout';
    }
}
