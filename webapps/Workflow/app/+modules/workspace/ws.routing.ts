import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkspaceComponent } from './ws.component';

const routes: Routes = [
    { path: 'Workspace', component: WorkspaceComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class WorkspaceRoutingModule { }
