import { Component, Input, HostBinding, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
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
    headerTitle: string = 'Projects';
    workspaceUrl: string = 'Logout'; // '/Workspace/p?id=workspace';
    logoUrl: string = 'img/logo.png';

    constructor(
        private store: Store<any>,
        private environmentActions: EnvironmentActions
    ) { }

    searchFocus() {
        this.store.dispatch(this.environmentActions.toggleSearch());
    }

    searchBlur() {
        this.store.dispatch(this.environmentActions.hideNav());
    }

    search(keyWordInput) {
        this.store.dispatch(this.environmentActions.search(keyWordInput.value));
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
