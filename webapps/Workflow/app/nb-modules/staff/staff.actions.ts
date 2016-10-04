import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Organization, Employee } from './models';

@Injectable()
export class StaffActions {

    static FETCH_ORGANIZATIONS = 'FETCH_ORGANIZATIONS';
    static FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';

    //===================================
    //  FETCH
    //-----------------------------------

    fetchOrganizations(organizations: Organization[]): Action {
        return {
            type: StaffActions.FETCH_ORGANIZATIONS,
            payload: { organizations }
        };
    }

    fetchEmployees(employees: Employee[]): Action {
        return {
            type: StaffActions.FETCH_EMPLOYEES,
            payload: { employees }
        };
    }
}
