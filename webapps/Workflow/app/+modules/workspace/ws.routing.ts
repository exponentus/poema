import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkspaceComponent } from './ws.component';

export const WORKSPACE_ROUTES: Routes = [
    { path: 'workspace', component: WorkspaceComponent }
];

@NgModule({
    imports: [RouterModule.forChild(WORKSPACE_ROUTES)],
    exports: [RouterModule],
})

export class WorkspaceRoutingModule { }
