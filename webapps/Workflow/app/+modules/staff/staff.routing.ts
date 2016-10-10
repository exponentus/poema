import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffContainerComponent } from './components/container';
import { StaffViewComponent } from './components/view';

const routes: Routes = [{
    path: 'Staff', component: StaffContainerComponent,
    children: [
        { path: '', redirectTo: 'organization-view', pathMatch: 'full' },
        { path: ':id', component: StaffViewComponent }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class StaffRoutingModule { }
