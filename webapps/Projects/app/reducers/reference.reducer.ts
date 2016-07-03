import { Tag, TaskType, RequestType } from '../models';

export const FETCH_TAGS = 'FETCH_TAGS';
export const FETCH_TASK_TYPES = 'FETCH_TASK_TYPES';
export const FETCH_REQUEST_TYPES = 'FETCH_REQUEST_TYPES';

export interface IReferenceState {
    tags: Tag[],
    taskTypes: TaskType[],
    requestTypes: RequestType[]
};

const initialState = {
    tags: [],
    taskTypes: [],
    requestTypes: []
};

export const referenceReducer = (state = initialState, {type, payload}): IReferenceState => {
    switch (type) {
        case FETCH_TAGS:
            return Object.assign({}, state, {
                tags: payload.tags
            });
        case FETCH_TASK_TYPES:
            return Object.assign({}, state, {
                taskTypes: payload.taskTypes
            });
        case FETCH_REQUEST_TYPES:
            return Object.assign({}, state, {
                requestTypes: payload.requestTypes
            });
        default:
            return state;
    }
};
