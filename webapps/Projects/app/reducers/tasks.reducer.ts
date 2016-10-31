import { Task, Tag, TaskType, Employee } from '../models';

import { TaskActions } from '../actions';

export interface ITasksState {
    meta: {},
    tasks: Task[],
    expandedIds: string[],
    loading: boolean,
    filter: {
        taskStatus: string,
        taskType: any,
        assigneeUser: any,
        tags: any[]
    }
};

const initialState: ITasksState = {
    meta: {},
    tasks: [],
    expandedIds: [] = [],
    loading: false,
    filter: {
        taskStatus: '',
        taskType: null,
        assigneeUser: null,
        tags: []
    }
};

export const tasksReducer = (state = initialState, {type, payload}): ITasksState => {
    switch (type) {
        case TaskActions.FETCH_TASKS:
            return Object.assign({}, state, {
                loading: true
            });
        case TaskActions.FETCH_TASKS_FULFILLED:
            return Object.assign({}, state, {
                tasks: payload.tasks,
                meta: payload.meta,
                loading: false
            });
        case TaskActions.FETCH_TASKS_FAILED:
            return Object.assign({}, state, {
                tasks: payload.tasks,
                meta: payload.meta,
                loading: false
            });
        case TaskActions.FETCH_TASK_FULFILLED:
            return Object.assign({}, state, {
                task: payload.task
            });
        case TaskActions.TOGGLE_STREAM_EXPAND:
            let ind = state.expandedIds.indexOf(payload);
            if (ind == -1) {
                let ps = [].concat(state.expandedIds);
                ps.push(payload);
                return Object.assign({}, state, {
                    expandedIds: ps
                });
            } else {
                return Object.assign({}, state, {
                    expandedIds: state.expandedIds.filter(it => it != payload)
                });
            }
        case TaskActions.SET_FILTER:
            return Object.assign({}, state, {
                filter: payload
            });
        default:
            return state;
    }
};
