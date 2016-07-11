import { Task, Request, Comment } from '../models';

export const TASK_REQUEST_NEW = 'TASK_REQUEST_NEW';
export const TASK_REQUEST_CANCEL = 'TASK_REQUEST_CANCEL';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const FETCH_REQUESTS = 'FETCH_REQUESTS';
export const TASK_CLOSE = 'TASK_CLOSE';

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
        case FETCH_REQUESTS:
            return Object.assign({}, state, {
                requests: payload.requests
            });
        case TASK_REQUEST_NEW:
            return Object.assign({}, state, {
                task: payload,
                showRequest: true
            });
        case TASK_REQUEST_CANCEL:
            return Object.assign({}, state, {
                showRequest: false
            });
        case FETCH_COMMENTS:
            return Object.assign({}, state, {
                comments: payload.comments
            });
        case TASK_CLOSE:
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
