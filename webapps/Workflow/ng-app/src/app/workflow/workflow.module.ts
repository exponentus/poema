import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    NbCommonModule,
    NbApprovalModule,
    NbLifeCycleModule,
    NbAclModule,
    NbEntityCreationDetailsModule
} from '@nb/core';

import { WORKFLOW_ROUTES } from './workflow.routes';
import {
    WorkflowContainerComponent,
    IncomingFormComponent,
    OutgoingFormComponent,
    OfficeMemoFormComponent,
    AssignmentFormComponent,
    ReportFormComponent
} from './components';
import {
    ControlComponent, ControlAssigneeModalFormComponent,
    TimeInputComponent,
    DocumentHierarchyComponent
} from './components/shared';

import { ValueObjectService } from './services';

@NgModule({
    declarations: [
        WorkflowContainerComponent,
        IncomingFormComponent,
        OutgoingFormComponent,
        OfficeMemoFormComponent,
        AssignmentFormComponent,
        ReportFormComponent,
        DocumentHierarchyComponent,
        ControlComponent, ControlAssigneeModalFormComponent,
        TimeInputComponent
    ],
    imports: [
        NbCommonModule,
        RouterModule.forChild(WORKFLOW_ROUTES),
        NbApprovalModule,
        NbLifeCycleModule,
        NbAclModule,
        NbEntityCreationDetailsModule
    ],
    providers: [
        ValueObjectService
    ]
})
export class WorkflowModule { }
