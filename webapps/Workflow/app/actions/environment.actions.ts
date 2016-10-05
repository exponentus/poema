import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class EnvironmentActions {

    static SEARCH = 'SEARCH';
    static RESET_SEARCH = 'RESET_SEARCH';
    static TOGGLE_NAV = 'TOGGLE_NAV';
    static TOGGLE_SEARCH = 'TOGGLE_SEARCH';
    static HIDE_NAV = 'HIDE_NAV';
    static SET_REDIRECT_URL = 'SET_REDIRECT_URL';
    static SET_NAV_URL = 'NAV_URL';
    static SET_APPS = 'SET_APPS';

    search(keyWord): Action {
        return {
            type: EnvironmentActions.SEARCH,
            payload: { keyWord }
        };
    }

    resetSearch(): Action {
        return {
            type: EnvironmentActions.RESET_SEARCH
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

    setRedirectUrl(redirectUrl: any): Action {
        return {
            type: EnvironmentActions.SET_REDIRECT_URL,
            payload: { redirectUrl }
        };
    }

    setApps(apps: any[]): Action {
        return {
            type: EnvironmentActions.SET_APPS,
            payload: { apps }
        };
    }

    setNavUrl(rootSegment: string, navUrl: any): Action {
        return {
            type: EnvironmentActions.SET_NAV_URL,
            payload: { rootSegment, navUrl }
        };
    }
}
