import { Project } from '../models';

export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
export const FETCH_NAV_PROJECTS = 'FETCH_NAV_PROJECTS';

export interface IAppState {
    userProfile: any,
    navProjects: Project[],
    languages: any,
    pageSize: number
};

const initialState: IAppState = {
    userProfile: null,
    navProjects: [],
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
        case FETCH_NAV_PROJECTS:
            return Object.assign({}, state, {
                navProjects: payload
            });
        default:
            return state;
    }
};
