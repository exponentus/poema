import { provideRouter, RouterConfig }  from '@angular/router';

import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard';
import { ProjectsComponent } from './components/project/projects';
import { ProjectComponent } from './components/project/project';
import { TasksComponent } from './components/task/tasks';
import { TaskComponent } from './components/task/task';
import { UserProfileComponent } from './components/user-profile';
import { LoginComponent } from './components/login';
import { User } from './models/user';

const routes: RouterConfig = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId', component: ProjectComponent, canActivate: [AuthGuard] },
    { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
    // {
    //     path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard], children: [
    //         { path: ':projectId', component: ProjectComponent }
    //     ]
    // },
    { path: 'project/:projectId/tasks', component: TasksComponent, canActivate: [AuthGuard] },
    { path: 'tasks/:for', component: TasksComponent, canActivate: [AuthGuard] },
    { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
    { path: 'task/:taskId', component: TaskComponent, canActivate: [AuthGuard] },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', component: DashboardComponent, canActivate: [AuthGuard] }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    AuthGuard
];
