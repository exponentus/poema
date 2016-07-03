import { Project } from '../models';

export const FETCH_NAV_PROJECTS = 'FETCH_NAV_PROJECTS';

export interface INavProjectsState {
    navProjects: Project[],
    loading: boolean
};

const initialState: INavProjectsState = {
    navProjects: [],
    loading: false
};

export const navReducer = (state = initialState, {type, payload}): INavProjectsState => {
    switch (type) {
        case FETCH_NAV_PROJECTS:
            return payload;
        default:
            return state;
    }
};
