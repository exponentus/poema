import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Organization, User } from '../models';

@Injectable()
export class StaffActions {

    static FETCH_ORGANIZATIONS = 'FETCH_ORGANIZATIONS';
    static FETCH_USERS = 'FETCH_USERS';


    //===================================
    //  FETCH
    //-----------------------------------

    fetchOrganizations(organizations: Organization[]): Action {
        return {
            type: StaffActions.FETCH_ORGANIZATIONS,
            payload: { organizations }
        };
    }

    fetchUsers(users: User[]): Action {
        return {
            type: StaffActions.FETCH_USERS,
            payload: { users }
        };
    }
}
