import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { EnvironmentActions } from '../../actions/environment.actions';
import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { User } from '../../models/user';

@Component({
    selector: 'navbar',
    template: require('./navbar.html'),
    directives: [ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class NavbarComponent {
    @Input() user: User;
    keyup$ = new Subject<KeyboardEvent>();
    headerTitle: string = 'Projects';
    workspaceUrl: string = 'Logout'; // '/Workspace/p?id=workspace';
    logoUrl: string = 'img/logo.png';

    constructor(
        private store: Store<any>,
        private environmentActions: EnvironmentActions
    ) { }

    ngOnInit() {
        this.keyup$
            .debounceTime(300)
            .map(event => (event.target as HTMLInputElement).value)
            .distinctUntilChanged()
            .subscribe(value => this.search(value));
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
        window.location.href = 'Logout';
    }
}
