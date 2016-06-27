import { Project } from '../models/project';

export const FETCH_NAV_PROJECTS = 'FETCH_NAV_PROJECTS';

export interface IProjectsState {
    navProjects: Project[],
    loading: boolean
};

const initialState: IProjectsState = {
    navProjects: [],
    loading: false
};

export const navReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case FETCH_NAV_PROJECTS:
            return payload;
        default:
            return state;
    }
};
