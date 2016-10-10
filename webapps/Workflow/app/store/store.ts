import { compose } from '@ngrx/core/compose';
import { combineReducers, provideStore } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { environmentReducer as environment } from '../reducers';

const logger = storeLogger({
    level: 'log', // 'console' | 'warn' | 'error' | 'info'; default log
    collapsed: true,
    duration: true,
    timestamp: true
});

export const APP_STORE = provideStore(
    compose(logger, combineReducers)({
        environment
    })
);
