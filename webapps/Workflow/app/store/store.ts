import { compose } from '@ngrx/core/compose';
import { combineReducers, provideStore } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import {
    authedReducer as authed,
    environmentReducer as environment
} from '../reducers';

import { referenceReducer as reference } from '../+modules/reference/reference.reducer';
import { staffReducer as staff } from '../+modules/staff/staff.reducer';
import { workflowReducer as workflow } from '../+modules/workflow/workflow.reducer';

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
        reference,
        staff,
        workflow
    })
);
