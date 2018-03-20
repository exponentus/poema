import { Routes } from '@angular/router';

import { ViewPage, UserProfileComponent, OfflinePage } from '@nb/core';

import { DashboardComponent } from './pages';
import {
    ProjectsContainerComponent,
    ProjectComponent,
    TaskComponent,
    RequestComponent
} from './components';

export const PROJECTS_ROUTES: Routes = [{
    path: 'Projects', component: ProjectsContainerComponent,
    children: [
        { path: '', redirectTo: 'tasks/s/my', pathMatch: 'full' },
        { path: 'index', redirectTo: 'tasks/s/my', pathMatch: 'full' },
        { path: 'offline', component: OfflinePage },
        { path: 'search', component: ViewPage },
        { path: 'user-profile', component: UserProfileComponent },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'projects/:id', component: ProjectComponent },
        { path: 'projects', component: ViewPage, data: { filterId: 'projects_project' } },
        {
            path: 'tasks/s/:slug', component: ViewPage, data: {
                url: '/Projects/tasks',
                filterId: 'projects_tasks',
                settings: { treeMode: true }
            }
        },
        { path: 'tasks/:id', component: TaskComponent },
        {
            path: 'tasks', component: ViewPage, data: {
                filterId: 'projects_tasks',
                settings: { treeMode: true }
            }
        },
        { path: 'requests/:id', component: RequestComponent }
    ]
}];
