import { ProjectActions } from './project.actions';
import { TaskActions } from './task.actions';
import { ReferenceActions } from './reference.actions';
import { StaffActions } from './staff.actions';

export { ProjectActions };
export { TaskActions };
export { ReferenceActions };
export { StaffActions };

export const APP_STORE_ACTIONS = [
    ProjectActions,
    TaskActions,
    ReferenceActions,
    StaffActions
];
