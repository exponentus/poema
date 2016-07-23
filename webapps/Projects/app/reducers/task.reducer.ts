import { Task, Request, Comment } from '../models';

import { TaskActions } from '../actions';

export interface ITaskState {
    task: Task,
    request: Request,
    requests: Request[],
    showRequest: boolean,
    comments: Comment[]
};

const initialState: ITaskState = {
    task: null,
    request: null,
    requests: [],
    showRequest: false,
    comments: []
};

export const taskReducer = (state = initialState, {type, payload}): ITaskState => {
    switch (type) {
        case TaskActions.FETCH_TASK_REQUESTS_FULFILLED:
            return Object.assign({}, state, {
                requests: payload.requests
            });
        case TaskActions.TASK_REQUEST_NEW:
            return Object.assign({}, state, {
                task: payload,
                showRequest: true
            });
        case TaskActions.TASK_REQUEST_CANCEL:
            return Object.assign({}, state, {
                showRequest: false
            });
        case TaskActions.FETCH_TASK_COMMENTS_FULFILLED:
            return Object.assign({}, state, {
                comments: payload.comments
            });
        case TaskActions.TASK_UNLOAD:
            return {
                task: null,
                request: null,
                requests: [],
                showRequest: false,
                comments: []
            };
        default:
            return state;
    }
};
