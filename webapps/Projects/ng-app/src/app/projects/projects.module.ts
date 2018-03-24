import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    NbCommonModule, TimeLineModule, NBChartModule,
    NbAclModule, NbActivityModule
} from '@nb/core';

import { PROJECTS_ROUTES } from './projects.routes';
import { DashboardService } from './services/dashboard.service';
import { ProjectService } from './services/project.service';
import { TaskService } from './services/task.service';
import { RequestService } from './services/request.service';

import { DashboardComponent } from './pages';
import {
    ProjectsContainerComponent,
    ReportWizardComponent,
    ProjectComponent,
    TaskComponent,
    TaskListComponent,
    ApprovalComponent,
    ApproverDecisionIconComponent,
    RequestComponent,
    TaskStatusComponent
} from './components';

@NgModule({
    declarations: [
        ProjectsContainerComponent,
        DashboardComponent,
        ReportWizardComponent,
        ProjectComponent,
        TaskComponent,
        TaskListComponent,
        ApprovalComponent,
        ApproverDecisionIconComponent,
        RequestComponent,
        TaskStatusComponent
    ],
    imports: [
        NbCommonModule,
        RouterModule.forChild(PROJECTS_ROUTES),
        TimeLineModule,
        NBChartModule,
        NbAclModule,
        NbActivityModule
    ],
    providers: [
        DashboardService,
        ProjectService,
        TaskService,
        RequestService
    ]
})
export class ProjectsModule { }
