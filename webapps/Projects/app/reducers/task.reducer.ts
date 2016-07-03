import { Task, Request, Comment } from '../models';

export const TASK_REQUEST_NEW = 'TASK_REQUEST_NEW';
export const TASK_REQUEST_CANCEL = 'TASK_REQUEST_CANCEL';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';

export interface ITaskState {
    task: Task,
    request: Request,
    showRequest: boolean,
    comments: Comment[]
};

const initialState: ITaskState = {
    task: null,
    request: null,
    showRequest: false,
    comments: null
};

export const taskReducer = (state = initialState, {type, payload}): ITaskState => {
    switch (type) {
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
                comments: payload
            });
        default:
            return state;
    }
};
