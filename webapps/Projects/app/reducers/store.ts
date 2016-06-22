import { combineReducers, provideStore } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

// reducers
import { projectsReducer as projects } from './projects.reducer';
import { tasksReducer as tasks } from './tasks.reducer';

export const store = provideStore(
    compose(combineReducers)({ projects, tasks })
);
