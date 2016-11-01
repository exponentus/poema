import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { IAuthedState } from '../reducers/authed.reducer';
import { User } from '../models';

@Injectable()
export class AppActions {

    static FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
    static FETCH_USER_PROFILE_FAILED = 'FETCH_USER_PROFILE_FAILED';
    static FETCH_USER_PROFILE_FULFILLED = 'FETCH_USER_PROFILE_FULFILLED';


    //===================================
    //  FETCH
    //-----------------------------------

    fetchUserProfile(): Action {
        return {
            type: AppActions.FETCH_USER_PROFILE
        };
    }

    fetchUserProfileFailed(error: any): Action {
        return {
            type: AppActions.FETCH_USER_PROFILE_FAILED,
            payload: error
        };
    }

    fetchUserProfileFulfilled(payload: IAuthedState): Action {
        return {
            type: AppActions.FETCH_USER_PROFILE_FULFILLED,
            payload: payload
        };
    }
}
