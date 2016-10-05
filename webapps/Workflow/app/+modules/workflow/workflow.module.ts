import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';

import { WorkflowRoutingModule } from './workflow.routing';
import { IncomingViewComponent } from './components/incoming/incoming-view';
import { IncomingFormComponent } from './components/incoming/incoming-form';
import { OutgoingViewComponent } from './components/outgoing/outgoing-view';
import { OutgoingFormComponent } from './components/outgoing/outgoing-form';
import { OfficeMemoViewComponent } from './components/office-memo/office-memo-view';
import { OfficeMemoFormComponent } from './components/office-memo/office-memo-form';

import {
    WorkflowIncomingService,
    WorkflowOutgoingService,
    WorkflowOfficeMemoService
} from './services';

@NgModule({
    declarations: [
        IncomingViewComponent,
        IncomingFormComponent,
        OutgoingViewComponent,
        OutgoingFormComponent,
        OfficeMemoViewComponent,
        OfficeMemoFormComponent
    ],
    imports: [
        SharedModule,
        WorkflowRoutingModule
    ],
    providers: [
        WorkflowIncomingService,
        WorkflowOutgoingService,
        WorkflowOfficeMemoService
    ]
})

export class WorkflowModule { }
