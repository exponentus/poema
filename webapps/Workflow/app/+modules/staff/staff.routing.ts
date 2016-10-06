import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffIndexComponent } from './components/index/index';
import { StaffViewComponent } from './components/view';

const routes: Routes = [
    { path: 'staff', component: StaffIndexComponent },
    { path: 'staff/:id', component: StaffViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class StaffRoutingModule { }
