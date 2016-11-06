import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class NavActions {

    static RELOAD_NAV = 'RELOAD_NAV';

    reloadNav(): Action {
        return {
            type: NavActions.RELOAD_NAV,
            payload: new Object()
        };
    }
}
