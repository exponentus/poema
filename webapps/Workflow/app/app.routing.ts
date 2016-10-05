import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile';
import { LoginComponent } from './components/login';
import { Error404 } from './components/404';

import { WORKSPACE_ROUTES } from './+modules/workspace/ws.routing';
import { REFERENCE_ROUTES } from './+modules/reference/reference.routing';
import { STAFF_ROUTES } from './+modules/staff/staff.routing';
import { WORKFLOW_ROUTES } from './+modules/workflow/workflow.routing';

const routes: Routes = [
    // { path: 'workspace', loadChildren: './+modules/workspace/ws.module#WorkspaceModule' },
    // { path: 'reference', loadChildren: './+modules/reference/reference.module#ReferenceModule' },
    // { path: 'staff', loadChildren: './+modules/staff/staff.module#StaffModule' },
    // { path: 'workflow', loadChildren: './+modules/workflow/workflow.module#WorkflowModule' },
    ...WORKSPACE_ROUTES,
    ...REFERENCE_ROUTES,
    ...STAFF_ROUTES,
    ...WORKFLOW_ROUTES,
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', component: Error404 }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})

export class AppRoutingModule { }
