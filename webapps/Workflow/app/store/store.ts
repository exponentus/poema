import { compose } from '@ngrx/core/compose';
import { combineReducers, provideStore } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { environmentReducer as environment } from '../reducers/environment.reducer';
import { authedReducer as authed } from '../reducers/authed.reducer';

import { referenceReducer as reference } from '../nb-modules/reference/reference.reducer';
import { staffReducer as staff } from '../nb-modules/staff/staff.reducer';
import { workflowReducer as workflow } from '../nb-modules/workflow/workflow.reducer';

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
