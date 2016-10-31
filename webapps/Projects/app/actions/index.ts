import { EnvironmentActions } from './environment.actions';
import { AppActions } from './app.actions';
import { TaskActions } from './task.actions';
import { NavActions } from './nav.actions';

export { EnvironmentActions };
export { AppActions };
export { TaskActions };
export { NavActions }

export const APP_STORE_ACTIONS = [
    EnvironmentActions,
    AppActions,
    TaskActions,
    NavActions
];
