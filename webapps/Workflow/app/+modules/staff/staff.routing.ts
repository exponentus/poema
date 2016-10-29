import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffContainerComponent } from './components/container';
import { StaffViewComponent } from './components/view';
import { StaffFormComponent } from './components/form';

const routes: Routes = [{
    path: 'Staff', component: StaffContainerComponent,
    children: [
        { path: '', redirectTo: 'organization-view', pathMatch: 'full' },
        { path: ':viewId/:docId', component: StaffFormComponent },
        { path: ':viewId', component: StaffViewComponent }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class StaffRoutingModule { }
