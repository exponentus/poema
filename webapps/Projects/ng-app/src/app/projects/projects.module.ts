import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NbCommonModule, TimeLineModule, NBChartModule } from '@nb/core';

import { PROJECTS_ROUTES } from './projects.routes';
import {
    DashboardService, ProjectService,
    DemandService, TaskService, RequestService
} from './services';

import { DashboardComponent, DemandComponent } from './pages';
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
        DemandComponent,
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
        NBChartModule
    ],
    providers: [
        DashboardService,
        ProjectService,
        DemandService,
        TaskService,
        RequestService
    ]
})
export class ProjectsModule { }
