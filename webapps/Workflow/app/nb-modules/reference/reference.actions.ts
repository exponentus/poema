import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { TaskType, RequestType, Tag } from './models';

@Injectable()
export class ReferenceActions {

    static FETCH_TASK_TYPES = 'FETCH_TASK_TYPES';
    static FETCH_REQUEST_TYPES = 'FETCH_REQUEST_TYPES';
    static FETCH_TAGS = 'FETCH_TAGS';
    static FETCH_REFERENCE_SUCCESS = 'FETCH_REFERENCE_SUCCESS';
    static FETCH_REFERENCE_FAILED = 'FETCH_REFERENCE_FAILED';

    //===================================
    //  FETCH
    //-----------------------------------

    fetchTaskTypes(taskTypes: TaskType[]): Action {
        return {
            type: ReferenceActions.FETCH_TASK_TYPES,
            payload: { taskTypes }
        };
    }

    fetchRequestTypes(requestTypes: RequestType[]): Action {
        return {
            type: ReferenceActions.FETCH_REQUEST_TYPES,
            payload: { requestTypes }
        };
    }

    fetchTags(tags: Tag[]): Action {
        return {
            type: ReferenceActions.FETCH_TAGS,
            payload: { tags }
        };
    }

    fetchReferenceFailed(error: any): Action {
        return {
            type: ReferenceActions.FETCH_REFERENCE_FAILED,
            payload: error
        };
    }
}
