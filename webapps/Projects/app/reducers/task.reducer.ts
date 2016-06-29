import { Task, Request } from '../models';

export const TASK_REQUEST_NEW = 'TASK_REQUEST_NEW';
export const TASK_REQUEST_CANCEL = 'TASK_REQUEST_CANCEL';

export interface ITaskState {
    task: Task,
    request: Request,
    showRequest: boolean
};

const initialState: ITaskState = {
    task: null,
    request: null,
    showRequest: false
};

export const taskReducer = (state = initialState, {type, payload}) => {
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
        default:
            return state;
    }
};
