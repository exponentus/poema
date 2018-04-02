import { Routes } from '@angular/router';

import { ViewPage, UserProfileComponent, OfflinePage } from '@nb/core';

import {
    WorkflowContainerComponent, IncomingFormComponent,
    OutgoingFormComponent, OfficeMemoFormComponent,
    AssignmentFormComponent, ReportFormComponent
} from './components';

export const WORKFLOW_ROUTES: Routes = [{
    path: 'Workflow', component: WorkflowContainerComponent,
    children: [
        { path: '', redirectTo: 'incomings', pathMatch: 'full' },
        { path: 'index', redirectTo: 'incomings', pathMatch: 'full' },
        { path: 'offline', component: OfflinePage },
        { path: 'search', component: ViewPage },
        { path: 'user-profile', component: UserProfileComponent },

        { path: 'assignments/my', component: ViewPage, data: { filterId: 'assignment' } },
        { path: 'assignments/inbox', component: ViewPage, data: { filterId: 'assignment' } },
        { path: 'assignments/:id', component: AssignmentFormComponent },
        { path: 'assignments', component: ViewPage, data: { filterId: 'assignment' } },

        { path: 'reports/:id', component: ReportFormComponent },

        { path: 'incomings/:id', component: IncomingFormComponent },
        { path: 'incomings', component: ViewPage, data: { filterId: 'incoming' } },

        { path: 'outgoings/:id', component: OutgoingFormComponent },
        { path: 'outgoings', component: ViewPage, data: { filterId: 'outgoing' } },

        { path: 'office-memos/:id', component: OfficeMemoFormComponent },
        { path: 'office-memos', component: ViewPage, data: { filterId: 'officeMemo' } },

        { path: 'projects/my', component: ViewPage, data: { filterId: 'actionableDocument' } },
        { path: 'approvals/pending', component: ViewPage, data: { filterId: 'actionableDocument' } }
    ]
}];
