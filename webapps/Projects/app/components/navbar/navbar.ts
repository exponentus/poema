import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppService } from '../../services/app.service';
import { EnvironmentActions } from '../../actions/environment.actions';
import { IEnvironmentState } from '../../reducers/environment.reducer';
import { User } from '../../models/user';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.html'
})

export class NavbarComponent {
    @Input() user: User;
    headerTitle: string = 'Projects';
    logoUrl: string = 'img/logo.png';

    constructor(
        private store: Store<any>,
        private environmentActions: EnvironmentActions,
        private appService: AppService
    ) { }

    get workspaceUrl() {
        return this.appService.workspaceUrl;
    }

    toggleNav() {
        this.store.dispatch(this.environmentActions.toggleNav());
    }

    logout(event) {
        event.preventDefault();
        window.location.href = 'Logout';
    }
}
