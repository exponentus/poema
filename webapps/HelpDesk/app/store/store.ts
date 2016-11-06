import { compose } from '@ngrx/core/compose';
import { combineReducers, provideStore } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { environmentReducer as environment } from '../reducers/environment.reducer';
import { authedReducer as authed } from '../reducers/authed.reducer';
import { tasksReducer as tasks } from '../reducers/tasks.reducer';
import { navReducer as nav } from '../reducers/nav.reducer';

const logger = storeLogger({
    level: 'log', // 'console' | 'warn' | 'error' | 'info'; default log
    collapsed: true,
    duration: true,
    timestamp: true
});

export const APP_STORE = provideStore(
    compose(logger, combineReducers)({
        environment,
        authed,
        nav,
        tasks
    })
);
