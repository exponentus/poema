import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffIndexComponent } from './components/index';

const routes: Routes = [
    { path: 'staff', component: StaffIndexComponent },
    { path: 'staff/:id', component: StaffIndexComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class StaffRoutingModule { }
