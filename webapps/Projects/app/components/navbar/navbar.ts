import { Component, HostBinding, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { IS_MOBILE, IS_DESKTOP, TOGGLE_NAV, TOGGLE_SEARCH, HIDE_NAV } from '../../reducers/environment.reducer';
import { IAuthedState } from '../../reducers/authed.reducer';
import { NotificationService, NotificationComponent } from '../../shared/notification';
import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { User } from '../../models/user';

@Component({
    selector: 'navbar',
    template: require('./navbar.html'),
    directives: [ROUTER_DIRECTIVES, NotificationComponent, DROPDOWN_DIRECTIVES],
    providers: [NotificationService],
    pipes: [TranslatePipe]
})

export class NavbarComponent {
    private sub: any;
    loggedUser: User;
    HEADER_TITLE: string = 'Projects';
    workspaceUrl: string = '/Workspace/p?id=workspace';

    constructor(private store: Store<any>) {
        this.sub = this.store.select('authed').subscribe((data: IAuthedState) => {
            this.loggedUser = data.userProfile;
        });
    }

    ngOnDestroy() {
        this.sub && this.sub.unsubscribe();
    }

    searchFocus() {
        this.store.dispatch({ type: TOGGLE_SEARCH });
    }

    searchBlur() {
        this.store.dispatch({ type: HIDE_NAV });
    }

    toggleNav() {
        this.store.dispatch({ type: TOGGLE_NAV });
    }

    logout(event) {
        event.preventDefault();
        // this.loggedUser = null;
        window.location.href = 'Logout';
    }
}
