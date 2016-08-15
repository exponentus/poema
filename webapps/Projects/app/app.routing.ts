import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { RedirectGuard } from './redirect.guard';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ProjectsComponent } from './components/project/projects';
import { ProjectComponent } from './components/project/project';
import { TasksComponent } from './components/task/tasks';
import { TaskComponent } from './components/task/task';
import { RequestComponent } from './components/request/request';
import { UserProfileComponent } from './components/user-profile/user-profile';
import { LoginComponent } from './components/login';
import { User } from './models/user';

const routes: Routes = [
    { path: '', component: TasksComponent, canActivate: [RedirectGuard, AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId/tasks', component: TasksComponent, canActivate: [AuthGuard] },
    { path: 'projects/:projectId', component: ProjectComponent, canActivate: [AuthGuard] },
    { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
    // {
    //     path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard], children: [
    //         { path: ':projectId', component: ProjectComponent }
    //     ]
    // },
    { path: 'tasks/:for', component: TasksComponent, canActivate: [AuthGuard] },
    { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
    { path: 'task/:taskId/:new', component: TaskComponent, canActivate: [AuthGuard] },
    { path: 'task/:taskId', component: TaskComponent, canActivate: [AuthGuard] },
    { path: 'requests/:requestId', component: RequestComponent, canActivate: [AuthGuard] },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', component: TasksComponent, canActivate: [AuthGuard] }
];

export const APP_ROUTING = RouterModule.forRoot(routes);
