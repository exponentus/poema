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
        { path: '', redirectTo: 'incoming-view', pathMatch: 'full' },
        { path: 'incoming-view/:id', component: IncomingFormComponent },
        { path: 'incoming-view', component: IncomingViewComponent },
        //
        { path: 'outgoing-view/:id', component: OutgoingFormComponent },
        { path: 'outgoing-view', component: OutgoingViewComponent },
        //
        { path: 'officememo-view/:id', component: OfficeMemoFormComponent },
        { path: 'officememo-view', component: OfficeMemoViewComponent }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class WorkflowRoutingModule { }
