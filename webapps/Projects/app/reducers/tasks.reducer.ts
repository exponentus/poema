import { Task, Tag, TaskType, User } from '../models';

import { TaskActions } from '../actions';

export const SET_FILTER = 'SET_FILTER';
export const EXPAND_ID = 'EXPAND_ID';
export const COLLAPSE_ID = 'COLLAPSE_ID';

export interface ITasksState {
    meta: {},
    tasks: Task[],
    expandIds: string[],
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
    expandIds: [],
    loading: false,
    filter: {
        taskType: null,
        assigneeUser: null,
        tags: []
    }
};

export const tasksReducer = (state = initialState, {type, payload}): ITasksState => {
    switch (type) {
        case TaskActions.FETCH_TASKS_FULFILLED:
            return Object.assign({}, state, {
                tasks: payload.tasks,
                meta: payload.meta
            });
        case TaskActions.FETCH_TASK_FULFILLED:
            return Object.assign({}, state, {
                task: payload.task
            });
        case SET_FILTER:
            return Object.assign({}, state, {
                filter: payload
            });
        case EXPAND_ID:
            if (state.expandIds.indexOf(payload.id) == -1) {
                return Object.assign({}, state, {
                    expandIds: state.expandIds.push(payload.id)
                });
            }
            return state;
        case COLLAPSE_ID:
            let ind = state.expandIds.indexOf(payload.id);
            if (ind != -1) {
                let ids = state.expandIds.splice(ind);
                return Object.assign({}, state, {
                    expandIds: ids
                });
            }
            return state;
        default:
            return state;
    }
};
