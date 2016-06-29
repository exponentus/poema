import { combineReducers, provideStore } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

// models
import { Project, Task, TaskType, Tag, User, Attachment, Organization } from '../models';

// reducers
import { projectsReducer as projects } from '../reducers/projects.reducer';
import { tasksReducer as tasks } from '../reducers/tasks.reducer';
import { taskReducer as task } from '../reducers/task.reducer';
import { staffReducer as staff } from '../reducers/staff.reducer';
import { referenceReducer as reference } from '../reducers/reference.reducer';

export interface IAppStore {
    navProjects: Project[];
    projects: Project[];
    tasks: Task[];
    taskTypes: TaskType[];
    tags: Tag[];
    users: User[];
    organizations: Organization[];
};

export const APP_STORE = provideStore(
    compose(combineReducers)({
        projects,
        tasks,
        task,
        staff,
        reference
    })
);
