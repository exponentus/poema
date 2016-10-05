import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffIndexComponent } from './components/index';

export const STAFF_ROUTES: Routes = [
    { path: 'staff', component: StaffIndexComponent },
    { path: 'staff/:id', component: StaffIndexComponent }
];

@NgModule({
    imports: [RouterModule.forChild(STAFF_ROUTES)],
    exports: [RouterModule],
})

export class StaffRoutingModule { }
