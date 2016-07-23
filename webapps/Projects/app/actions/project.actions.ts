import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Project } from '../models';

@Injectable()
export class ProjectActions {

    static CREATE_PROJECT = 'CREATE_PROJECT';
    static CREATE_PROJECT_FAILED = 'CREATE_PROJECT_FAILED';
    static CREATE_PROJECT_FULFILLED = 'CREATE_PROJECT_FULFILLED';

    static FETCH_PROJECTS = 'FETCH_PROJECTS';
    static FETCH_PROJECTS_FAILED = 'FETCH_PROJECTS_FAILED';
    static FETCH_PROJECTS_FULFILLED = 'FETCH_PROJECTS_FULFILLED';

    static UPDATE_PROJECT = 'UPDATE_PROJECT';
    static UPDATE_PROJECT_FAILED = 'UPDATE_PROJECT_FAILED';
    static UPDATE_PROJECT_FULFILLED = 'UPDATE_PROJECT_FULFILLED';

    static DELETE_PROJECT = 'DELETE_PROJECT';
    static DELETE_PROJECT_FAILED = 'DELETE_PROJECT_FAILED';
    static DELETE_PROJECT_FULFILLED = 'DELETE_PROJECT_FULFILLED';


    //===================================
    //  CREATE
    //-----------------------------------

    createProject(project: Project): Action {
        return {
            type: ProjectActions.CREATE_PROJECT,
            payload: {
                project
            }
        };
    }

    createProjectFailed(error: any): Action {
        return {
            type: ProjectActions.CREATE_PROJECT_FAILED,
            payload: error
        };
    }

    createProjectFulfilled(project: Project): Action {
        return {
            type: ProjectActions.CREATE_PROJECT_FULFILLED,
            payload: {
                project
            }
        };
    }


    //===================================
    //  FETCH
    //-----------------------------------

    fetchProjects(): Action {
        return {
            type: ProjectActions.FETCH_PROJECTS
        };
    }

    fetchProjectsFailed(error: any): Action {
        return {
            type: ProjectActions.FETCH_PROJECTS_FAILED,
            payload: error
        };
    }

    fetchProjectsFulfilled(projects: Project[], meta: any): Action {
        return {
            type: ProjectActions.FETCH_PROJECTS_FULFILLED,
            payload: {
                projects,
                meta
            }
        };
    }


    //===================================
    //  UPDATE
    //-----------------------------------

    updateProject(projectId: string, changes: any): Action {
        return {
            type: ProjectActions.UPDATE_PROJECT,
            payload: {
                changes,
                projectId
            }
        };
    }

    updateProjectFailed(error: any): Action {
        return {
            type: ProjectActions.UPDATE_PROJECT_FAILED,
            payload: error
        };
    }

    updateProjectFulfilled(project: Project): Action {
        return {
            type: ProjectActions.UPDATE_PROJECT_FULFILLED,
            payload: {
                project
            }
        };
    }


    //===================================
    //  DELETE
    //-----------------------------------

    deleteProject(projectId: string): Action {
        return {
            type: ProjectActions.DELETE_PROJECT,
            payload: {
                projectId
            }
        };
    }

    deleteProjectFailed(error: any): Action {
        return {
            type: ProjectActions.DELETE_PROJECT_FAILED,
            payload: error
        };
    }

    deleteProjectFulfilled(project: Project): Action {
        return {
            type: ProjectActions.DELETE_PROJECT_FULFILLED,
            payload: {
                project
            }
        };
    }
}
