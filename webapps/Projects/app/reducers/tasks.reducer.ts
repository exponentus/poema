import { Task } from '../models';

export const FETCH_TASKS = 'FETCH_TASKS';
export const FETCH_TASK = 'FETCH_TASK';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export interface ITasksState {
    meta: {},
    tasks: Task[],
    loading: boolean
};

const initialState: ITasksState = {
    meta: {},
    tasks: [],
    loading: false
};

export const tasksReducer = (state = initialState, {type, payload}): ITasksState => {
    switch (type) {
        case FETCH_TASKS:
            return Object.assign({}, state, {
                tasks: payload.tasks,
                meta: payload.meta
            });
        case FETCH_TASK:
            return Object.assign({}, state, {
                task: payload.task
            });
        case ADD_TASK:
            return state;
        case UPDATE_TASK:
            return state;
        case DELETE_TASK:
            return state;
        default:
            return state;
    }
};
