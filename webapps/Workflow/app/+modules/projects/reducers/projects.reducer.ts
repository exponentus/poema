import { Project } from '../models';

import { ProjectActions } from '../actions/project.actions';

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
        case ProjectActions.FETCH_PROJECTS:
            return Object.assign({}, state, {
                loading: true
            });
        case ProjectActions.FETCH_PROJECTS_FAILED:
            return Object.assign({}, state, {
                loading: false
            });
        case ProjectActions.FETCH_PROJECTS_FULFILLED:
            return Object.assign({}, state, {
                projects: payload.projects,
                meta: payload.meta,
                loading: false
            });
        default:
            return state;
    }
};
