import { Task, Tag, TaskType, User } from '../models';

export const FETCH_TASKS = 'FETCH_TASKS';
export const FETCH_TASK = 'FETCH_TASK';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const SET_FILTER = 'SET_FILTER';

export interface ITasksState {
    meta: {},
    tasks: Task[],
    loading: boolean,
    filter: {
        taskType: TaskType,
        assigneeUser: User,
        tags: Tag[]
    }
};

const initialState: ITasksState = {
    meta: {},
    tasks: [],
    loading: false,
    filter: {
        taskType: null,
        assigneeUser: null,
        tags: []
    }
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
        case SET_FILTER:
            return Object.assign({}, state, {
                filter: payload
            });
        default:
            return state;
    }
};
