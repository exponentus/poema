import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Task } from '../models';

@Injectable()
export class TaskActions {

    // TASK
    static CREATE_TASK = 'CREATE_TASK';
    static CREATE_TASK_FAILED = 'CREATE_TASK_FAILED';
    static CREATE_TASK_FULFILLED = 'CREATE_TASK_FULFILLED';

    static TASK_UNLOAD = 'TASK_UNLOAD';

    static FETCH_TASKS = 'FETCH_TASKS';
    static FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED';
    static FETCH_TASKS_FULFILLED = 'FETCH_TASKS_FULFILLED';

    static FETCH_TASK = 'FETCH_TASK';
    static FETCH_TASK_FAILED = 'FETCH_TASK_FAILED';
    static FETCH_TASK_FULFILLED = 'FETCH_TASK_FULFILLED';

    static UPDATE_TASK = 'UPDATE_TASK';
    static UPDATE_TASK_FAILED = 'UPDATE_TASK_FAILED';
    static UPDATE_TASK_FULFILLED = 'UPDATE_TASK_FULFILLED';

    static DELETE_TASK = 'DELETE_TASK';
    static DELETE_TASK_FAILED = 'DELETE_TASK_FAILED';
    static DELETE_TASK_FULFILLED = 'DELETE_TASK_FULFILLED';

    static TOGGLE_STREAM_EXPAND = 'TOGGLE_STREAM_EXPAND';

    static SET_FILTER = 'SET_FILTER';

    // TASK COMMENT
    static CREATE_TASK_COMMENT = 'CREATE_COMMENT_TASK';
    static CREATE_TASK_COMMENT_FAILED = 'CREATE_TASK_COMMENT_FAILED';
    static CREATE_TASK_COMMENT_FULFILLED = 'CREATE_TASK_COMMENT_FULFILLED';

    static FETCH_TASK_COMMENTS = 'FETCH_TASK_COMMENTS';
    static FETCH_TASK_COMMENTS_FAILED = 'FETCH_TASK_COMMENTS_FAILED';
    static FETCH_TASK_COMMENTS_FULFILLED = 'FETCH_TASK_COMMENTS_FULFILLED';

    static UPDATE_TASK_COMMENT = 'UPDATE_TASK_COMMENT';
    static UPDATE_TASK_COMMENT_FAILED = 'UPDATE_TASK_COMMENT_FAILED';
    static UPDATE_TASK_COMMENT_FULFILLED = 'UPDATE_TASK_COMMENT_FULFILLED';

    static DELETE_TASK_COMMENT = 'DELETE_TASK_COMMENT';
    static DELETE_TASK_COMMENT_FAILED = 'DELETE_TASK_COMMENT_FAILED';
    static DELETE_TASK_COMMENT_FULFILLED = 'DELETE_TASK_COMMENT_FULFILLED';

    // TASK REQUEST
    static TASK_REQUEST_ACCEPTANCE = 'TASK_REQUEST_ACCEPTANCE';
    static TASK_REQUEST_NEW = 'TASK_REQUEST_NEW';
    static TASK_REQUEST_CANCEL = 'TASK_REQUEST_CANCEL';

    static CREATE_TASK_REQUEST = 'CREATE_REQUEST_TASK';
    static CREATE_TASK_REQUEST_FAILED = 'CREATE_TASK_REQUEST_FAILED';
    static CREATE_TASK_REQUEST_FULFILLED = 'CREATE_TASK_REQUEST_FULFILLED';

    static FETCH_TASK_REQUESTS = 'FETCH_TASK_REQUESTS';
    static FETCH_TASK_REQUESTS_FAILED = 'FETCH_TASK_REQUESTS_FAILED';
    static FETCH_TASK_REQUESTS_FULFILLED = 'FETCH_TASK_REQUESTS_FULFILLED';


    //===================================
    //  CREATE TASK
    //-----------------------------------

    createTask(task: Task): Action {
        return {
            type: TaskActions.CREATE_TASK,
            payload: {
                task
            }
        };
    }

    createTaskFailed(error: any): Action {
        return {
            type: TaskActions.CREATE_TASK_FAILED,
            payload: error
        };
    }

    createTaskFulfilled(task: Task): Action {
        return {
            type: TaskActions.CREATE_TASK_FULFILLED,
            payload: {
                task
            }
        };
    }


    //===================================
    //  FETCH TASKS
    //-----------------------------------

    fetchTasks(): Action {
        return {
            type: TaskActions.FETCH_TASKS
        };
    }

    fetchTasksFailed(error: any): Action {
        return {
            type: TaskActions.FETCH_TASKS_FAILED,
            payload: error
        };
    }

    fetchTasksFulfilled(tasks: Task[], meta: any): Action {
        return {
            type: TaskActions.FETCH_TASKS_FULFILLED,
            payload: {
                tasks,
                meta
            }
        };
    }


    //===================================
    //  FETCH TASK
    //-----------------------------------

    fetchTask(taskId: string): Action {
        return {
            type: TaskActions.FETCH_TASK
        };
    }

    fetchTaskFailed(error: any): Action {
        return {
            type: TaskActions.FETCH_TASK_FAILED,
            payload: error
        };
    }

    fetchTaskFulfilled(task: Task): Action {
        return {
            type: TaskActions.FETCH_TASK_FULFILLED,
            payload: {
                task
            }
        };
    }


    //===================================
    //  UPDATE TASK
    //-----------------------------------

    updateTask(taskId: string, changes: any): Action {
        return {
            type: TaskActions.UPDATE_TASK,
            payload: {
                changes,
                taskId
            }
        };
    }

    updateTaskFailed(error: any): Action {
        return {
            type: TaskActions.UPDATE_TASK_FAILED,
            payload: error
        };
    }

    updateTaskFulfilled(task: Task): Action {
        return {
            type: TaskActions.UPDATE_TASK_FULFILLED,
            payload: {
                task
            }
        };
    }


    //===================================
    //  DELETE TASK
    //-----------------------------------

    deleteTask(taskId: string): Action {
        return {
            type: TaskActions.DELETE_TASK,
            payload: {
                taskId
            }
        };
    }

    deleteTaskFailed(error: any): Action {
        return {
            type: TaskActions.DELETE_TASK_FAILED,
            payload: error
        };
    }

    deleteTaskFulfilled(task: Task): Action {
        return {
            type: TaskActions.DELETE_TASK_FULFILLED,
            payload: {
                task
            }
        };
    }


    //===================================
    //  TASK STREAM ACTIONS
    //-----------------------------------

    toggleStreamExpand(id: string) {
        return {
            type: TaskActions.TOGGLE_STREAM_EXPAND,
            payload: id
        };
    }


    //===================================
    //  TASK FILTER ACTIONS
    //-----------------------------------

    setFilter(filter: any) {
        return {
            type: TaskActions.SET_FILTER,
            payload: filter
        };
    }
}
