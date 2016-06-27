import { Tag, TaskType } from '../models';

export const FETCH_TAGS = 'FETCH_TAGS';
export const FETCH_TASK_TYPES = 'FETCH_TASK_TYPES';

export interface IReferenceState {
    tags: Tag[],
    taskTypes: TaskType[]
};

const initialState = {
    tags: [],
    taskTypes: []
};

export const referenceReducer = (state = initialState, {type, payload}) => {
    // console.log('referenceReducer > ', 'ACTION:', type, payload, state);

    switch (type) {
        case FETCH_TAGS:
            return Object.assign({}, state, {
                tags: payload.tags
            });
        case FETCH_TASK_TYPES:
            return Object.assign({}, state, {
                taskTypes: payload.taskTypes
            });
        default:
            return state;
    }
};
