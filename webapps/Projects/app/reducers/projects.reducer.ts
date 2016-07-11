import { Project } from '../models';

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
        case FETCH_PROJECTS:
            return Object.assign({}, state, {
                projects: payload.projects,
                meta: payload.meta
            });
        case FETCH_PROJECT:
            return Object.assign({}, state, {
                project: payload.project
            });
        case ADD_PROJECT:
            return state;
        case UPDATE_PROJECT:
            return state;
        case DELETE_PROJECT:
            return state;
        default:
            return state;
    }
};
