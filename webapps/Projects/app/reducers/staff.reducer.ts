import { Organization, User } from '../models';

export const FETCH_ORGANIZATIONS = 'FETCH_ORGANIZATIONS';
export const FETCH_USERS = 'FETCH_USERS';

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
        case FETCH_ORGANIZATIONS:
            return Object.assign({}, state, {
                organizations: payload.organizations
            });
        case FETCH_USERS:
            return Object.assign({}, state, {
                users: payload
            });
        default:
            return state;
    }
};
