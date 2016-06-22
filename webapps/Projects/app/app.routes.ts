import { provideRouter, RouterConfig }  from '@angular/router';

import { DashboardComponent } from './components/dashboard';
import { ProjectsComponent } from './components/project/projects';
import { ProjectComponent } from './components/project/project';
import { TasksComponent } from './components/task/tasks';
import { TaskComponent } from './components/task/task';
import { UserProfileComponent } from './components/user-profile';
import { LoginComponent } from './components/login';
import { User } from './models/user';

const routes: RouterConfig = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'projects/:projectId', component: ProjectComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'project/:projectId/tasks', component: TasksComponent },
    { path: 'tasks/:for/:id', component: TaskComponent },
    { path: 'tasks/:for', component: TasksComponent },
    { path: 'tasks', component: TasksComponent },
    { path: 'task/:taskId', component: TaskComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: DashboardComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
