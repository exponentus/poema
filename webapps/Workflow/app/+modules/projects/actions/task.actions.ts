import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Task } from '../models';

@Injectable()
export class TaskActions {

    // TASK
    static FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED';
    static FETCH_TASKS_FULFILLED = 'FETCH_TASKS_FULFILLED';

    static TOGGLE_STREAM_EXPAND = 'TOGGLE_STREAM_EXPAND';

    static SET_FILTER = 'SET_FILTER';


    //===================================
    //  FETCH TASKS
    //-----------------------------------

    fetchTasksFailed(error: any): Action {
        return {
            type: TaskActions.FETCH_TASKS_FAILED,
            payload: error
        };
    }

    fetchTasksFulfilled(meta: any): Action {
        return {
            type: TaskActions.FETCH_TASKS_FULFILLED,
            payload: {
                meta
            }
        };
    }


    //===================================
    //  TASK EXPAND ACTIONS
    //-----------------------------------

    toggleExpanded(id: string) {
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
