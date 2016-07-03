import { Project } from '../models';

export const FETCH_NAV_PROJECTS = 'FETCH_NAV_PROJECTS';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_PROJECT = 'FETCH_PROJECT';
export const ADD_PROJECT = 'ADD_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';

export interface IProjectsState {
    meta: {},
    projects: Project[],
    project: Project,
    loading: boolean
};

const initialState: IProjectsState = {
    meta: {},
    projects: [],
    project: undefined,
    loading: false
};

export const projectsReducer = (state = initialState, {type, payload}): IProjectsState => {
    switch (type) {
        case FETCH_NAV_PROJECTS:
            return payload;
        case FETCH_PROJECTS:
            return payload;
        case FETCH_PROJECT:
            return payload;
        case ADD_PROJECT:
            return payload;
        case UPDATE_PROJECT:
            return payload;
        case DELETE_PROJECT:
            return payload;
        default:
            return state;
    }
};
