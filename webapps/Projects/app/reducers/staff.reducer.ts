import { Organization, Employee } from '../models';

import { StaffActions } from '../actions';

export interface IStaffState {
    organizations: Organization[],
    employees: Employee[]
};

const initialState: IStaffState = {
    organizations: [],
    employees: []
};

export const staffReducer = (state = initialState, {type, payload}): IStaffState => {
    switch (type) {
        case StaffActions.FETCH_ORGANIZATIONS:
            return Object.assign({}, state, {
                organizations: payload.organizations
            });
        case StaffActions.FETCH_EMPLOYEES:
            return Object.assign({}, state, {
                employees: payload.employees
            });
        default:
            return state;
    }
};
