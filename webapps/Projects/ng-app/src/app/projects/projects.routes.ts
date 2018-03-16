import { Routes } from '@angular/router';

import { ViewPage, UserProfileComponent, OfflinePage } from '@nb/core';

import { DashboardComponent, DemandComponent } from './pages';
import {
    ProjectsContainerComponent,
    ProjectComponent,
    TaskComponent,
    RequestComponent
} from './components';

export function routesPath(redirectTo: string = 'tasks/s/my') {
    return [
        { path: '', redirectTo: redirectTo, pathMatch: 'full' },
        { path: 'index', redirectTo: redirectTo, pathMatch: 'full' },
        { path: 'offline', component: OfflinePage },
        { path: 'search', component: ViewPage },
        { path: 'user-profile', component: UserProfileComponent },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'projects/:id', component: ProjectComponent },
        { path: 'projects', component: ViewPage, data: { filterId: 'projects_project' } },
        {
            path: 'demands/s/:slug', component: ViewPage, data: {
                url: '/HelpDesk/demands',
                filterId: 'helpdesk_demand'
            }
        },
        { path: 'demands/:id', component: DemandComponent },
        { path: 'demands', component: ViewPage, data: { filterId: 'helpdesk_demand' } },
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
    ];
}

export const PROJECTS_ROUTES: Routes = [{
    path: 'Projects', component: ProjectsContainerComponent,
    children: routesPath()
}];
