import { Organization } from '../models';

export const FETCH_ORGANIZATIONS = 'FETCH_ORGANIZATIONS';

export interface IStaffState {
    organizations: Organization[]
};

const initialState: IStaffState = {
    organizations: []
};

export const staffReducer = (state = initialState, {type, payload}) => {
    // console.log('staffReducer > ', 'ACTION:', type, payload, state);

    switch (type) {
        case FETCH_ORGANIZATIONS:
            return Object.assign({}, state, {
                organizations: payload.organizations
            });
        default:
            return state;
    }
};
