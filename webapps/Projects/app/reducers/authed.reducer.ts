import { Project } from '../models';

export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';

export interface IAppState {
    userProfile: any,
    languages: any,
    pageSize: number
};

const initialState: IAppState = {
    userProfile: null,
    languages: {},
    pageSize: 20
};

export const authedReducer = (state = initialState, {type, payload}): IAppState => {
    switch (type) {
        case FETCH_USER_PROFILE:
            return Object.assign({}, state, {
                userProfile: payload.userProfile,
                languages: payload.languages,
                pageSize: payload.pageSize
            });
        default:
            return state;
    }
};
