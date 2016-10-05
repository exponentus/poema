import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile';
import { LoginComponent } from './components/login';
import { Error404 } from './components/404';

// nb modules // TODO make lazy loading
import { WorkspaceModule } from './+modules/workspace/ws.module';
import { ReferenceModule } from './+modules/reference/reference.module';
import { StaffModule } from './+modules/staff/staff.module';
import { WorkflowModule } from './+modules/workflow/workflow.module';

const routes: Routes = [
    // { path: 'workspace', loadChildren: './+modules/workspace/ws.module#WorkspaceModule', canActivate: [AuthGuard] },
    // { path: 'reference', loadChildren: './+modules/reference/reference.module#ReferenceModule', canActivate: [AuthGuard] },
    // { path: 'staff', loadChildren: './+modules/staff/staff.module#StaffModule', canActivate: [AuthGuard] },
    // { path: 'workflow', loadChildren: './+modules/workflow/workflow.module#WorkflowModule', canActivate: [AuthGuard] },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', component: Error404 }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [
        RouterModule,
        // for lazy loading rm +modules
        WorkspaceModule,
        ReferenceModule,
        StaffModule,
        WorkflowModule
    ],
})

export class AppRoutingModule { }
