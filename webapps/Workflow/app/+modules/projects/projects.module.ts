import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';

import { ProjectsRoutingModule } from './projects.routing';
import { TaskActions } from './actions';
import { ProjectService, TaskService, ReferenceService } from './services';

import { ProjectsContainerComponent } from './components/container';
import { NavComponent } from './components/nav/nav';
import { ProjectsComponent } from './components/project/projects';
import { ProjectComponent } from './components/project/project';
import { TasksComponent } from './components/task/tasks';
import { TaskComponent } from './components/task/task';
import { TaskTreeComponent } from './components/task/task-tree';
import { TaskFilterComponent } from './components/task/task-filter';
import { TaskCancelDialogComponent } from './components/task/task-cancel-dialog';
import { RequestComponent } from './components/request/request';
import { RequestDeclineDialogComponent } from './components/request/request-decline-dialog';

import {
    TagsInputComponent,
    TaskStatusInputComponent
} from './components/shared';

@NgModule({
    declarations: [
        ProjectsContainerComponent,
        NavComponent,
        ProjectsComponent,
        ProjectComponent,
        TasksComponent,
        TaskComponent,
        TaskTreeComponent,
        TaskFilterComponent,
        TaskCancelDialogComponent,
        RequestComponent,
        RequestDeclineDialogComponent,
        //
        TagsInputComponent,
        TaskStatusInputComponent
    ],
    exports: [],
    imports: [
        SharedModule,
        ProjectsRoutingModule
    ],
    providers: [
        ProjectService,
        TaskService,
        TaskActions,
        ReferenceService
    ]
})

export class ProjectsModule { }
