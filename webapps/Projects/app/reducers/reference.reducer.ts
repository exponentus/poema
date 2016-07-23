import { Tag, TaskType, RequestType } from '../models';

import { ReferenceActions } from '../actions/reference.actions';

export interface IReferenceState {
    tags: Tag[],
    taskTypes: TaskType[],
    requestTypes: RequestType[],
    fetchFail: boolean
};

const initialState = {
    tags: [],
    taskTypes: [],
    requestTypes: [],
    fetchFail: false
};

export const referenceReducer = (state = initialState, {type, payload}): IReferenceState => {
    switch (type) {
        case ReferenceActions.FETCH_TAGS:
            return Object.assign({}, state, {
                tags: payload.tags
            });
        case ReferenceActions.FETCH_TASK_TYPES:
            return Object.assign({}, state, {
                taskTypes: payload.taskTypes
            });
        case ReferenceActions.FETCH_REQUEST_TYPES:
            return Object.assign({}, state, {
                requestTypes: payload.requestTypes
            });
        case ReferenceActions.FETCH_REFERENCE_FAILED:
            return Object.assign({}, state, {
                fetchFail: true
            });
        default:
            return state;
    }
};
