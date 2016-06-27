import { Project } from '../models/project';

export const FETCH_NAV_PROJECTS = 'FETCH_NAV_PROJECTS';

export interface IProjectsState {
    projects: Project[],
    loading: boolean
};

const initialState: IProjectsState = {
    projects: [],
    loading: false
};

export const navReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case FETCH_NAV_PROJECTS:
            return state;
        default:
            return state;
    }
};
