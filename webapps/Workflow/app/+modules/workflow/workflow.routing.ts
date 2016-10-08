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
    path: 'workflow', component: WorkflowContainerComponent,
    children: [
        { path: '', redirectTo: 'incoming-view', pathMatch: 'full' },
        { path: 'incoming-view', component: IncomingViewComponent },
        { path: 'incoming-form', component: IncomingFormComponent },
        { path: 'outgoing-view', component: OutgoingViewComponent },
        { path: 'outgoing-form', component: OutgoingFormComponent },
        { path: 'officememo-view', component: OfficeMemoViewComponent },
        { path: 'officememo-form', component: OfficeMemoFormComponent }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class WorkflowRoutingModule { }
