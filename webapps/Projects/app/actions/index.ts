import { EnvironmentActions } from './environment.actions';
import { AppActions } from './app.actions';
import { ProjectActions } from './project.actions';
import { TaskActions } from './task.actions';
import { ReferenceActions } from './reference.actions';
import { StaffActions } from './staff.actions';

export { EnvironmentActions };
export { AppActions };
export { ProjectActions };
export { TaskActions };
export { ReferenceActions };
export { StaffActions };

export const APP_STORE_ACTIONS = [
    EnvironmentActions,
    AppActions,
    ProjectActions,
    TaskActions,
    ReferenceActions,
    StaffActions
];
