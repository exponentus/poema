import { compose } from '@ngrx/core/compose';
import { combineReducers, provideStore } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { environmentReducer as environment } from '../reducers/environment.reducer';
import { authedReducer as authed } from '../reducers/authed.reducer';
import { projectsReducer as projects } from '../reducers/projects.reducer';
import { tasksReducer as tasks } from '../reducers/tasks.reducer';
import { taskReducer as task } from '../reducers/task.reducer';
import { staffReducer as staff } from '../reducers/staff.reducer';
import { referenceReducer as reference } from '../reducers/reference.reducer';

const logger = storeLogger({
    level: 'log', // 'console' | 'warn' | 'error' | 'info'; default log
    collapsed: false,
    duration: true,
    timestamp: true
});

export const APP_STORE = provideStore(
    compose(/*logger, */combineReducers)({
        environment,
        authed,
        projects,
        tasks,
        task,
        staff,
        reference
    })
);
