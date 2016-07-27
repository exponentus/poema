import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class EnvironmentActions {

    static SEARCH = 'SEARCH';
    static TOGGLE_NAV = 'TOGGLE_NAV';
    static TOGGLE_SEARCH = 'TOGGLE_SEARCH';
    static HIDE_NAV = 'HIDE_NAV';


    search(keyWord): Action {
        return {
            type: EnvironmentActions.SEARCH,
            payload: { keyWord }
        };
    }

    toggleNav(): Action {
        return {
            type: EnvironmentActions.TOGGLE_NAV
        };
    }

    toggleSearch(): Action {
        return {
            type: EnvironmentActions.TOGGLE_SEARCH
        };
    }

    hideNav(): Action {
        return {
            type: EnvironmentActions.HIDE_NAV
        };
    }
}
