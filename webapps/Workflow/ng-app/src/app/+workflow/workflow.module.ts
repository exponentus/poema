import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    NbCommonModule,
    ApprovalModule,
    LifeCycleModule,
    NbAclModule
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
        ApprovalModule,
        LifeCycleModule,
        NbAclModule
    ],
    providers: [
        ValueObjectService
    ]
})
export class WorkflowModule { }
