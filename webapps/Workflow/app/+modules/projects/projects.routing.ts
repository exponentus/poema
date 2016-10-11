import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsContainerComponent } from './components/container';
import { ProjectsComponent } from './components/project/projects';
import { ProjectComponent } from './components/project/project';
import { TasksComponent } from './components/task/tasks';
import { TaskComponent } from './components/task/task';
import { RequestComponent } from './components/request/request';

const routes: Routes = [{
    path: 'Projects', component: ProjectsContainerComponent,
    children: [
        { path: '', redirectTo: 'projects', pathMatch: 'full' },
        { path: 'projects/:projectId/tasks', component: TasksComponent },
        { path: 'projects/:projectId', component: ProjectComponent },
        { path: 'projects', component: ProjectsComponent },
        { path: 'tasks/:for', component: TasksComponent },
        { path: 'tasks', component: TasksComponent },
        { path: 'task/:taskId/:new', component: TaskComponent },
        { path: 'task/:taskId', component: TaskComponent },
        { path: 'requests/:requestId', component: RequestComponent }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ProjectsRoutingModule { }
