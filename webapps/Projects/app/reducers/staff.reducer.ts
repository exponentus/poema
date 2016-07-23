import { Organization, User } from '../models';

import { StaffActions } from '../actions';

export interface IStaffState {
    organizations: Organization[],
    users: User[]
};

const initialState: IStaffState = {
    organizations: [],
    users: []
};

export const staffReducer = (state = initialState, {type, payload}): IStaffState => {
    switch (type) {
        case StaffActions.FETCH_ORGANIZATIONS:
            return Object.assign({}, state, {
                organizations: payload.organizations
            });
        case StaffActions.FETCH_USERS:
            return Object.assign({}, state, {
                users: payload.users
            });
        default:
            return state;
    }
};
