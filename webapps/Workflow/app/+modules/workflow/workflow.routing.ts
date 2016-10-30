import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkflowContainerComponent } from './components/container';
import { IncomingViewComponent } from './components/incoming/incoming-view';
import { IncomingFormComponent } from './components/incoming/incoming-form';
import { OutgoingViewComponent } from './components/outgoing/outgoing-view';
import { OutgoingFormComponent } from './components/outgoing/outgoing-form';
import { OfficeMemoViewComponent } from './components/office-memo/office-memo-view';
import { OfficeMemoFormComponent } from './components/office-memo/office-memo-form';

const routes: Routes = [{
    path: 'Workflow', component: WorkflowContainerComponent,
    children: [
        { path: '', redirectTo: 'incomings', pathMatch: 'full' },
        { path: 'incomings/:id', component: IncomingFormComponent },
        { path: 'incomings', component: IncomingViewComponent },
        //
        { path: 'outgoings/:id', component: OutgoingFormComponent },
        { path: 'outgoings', component: OutgoingViewComponent },
        //
        { path: 'office-memos/:id', component: OfficeMemoFormComponent },
        { path: 'office-memos', component: OfficeMemoViewComponent }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class WorkflowRoutingModule { }
