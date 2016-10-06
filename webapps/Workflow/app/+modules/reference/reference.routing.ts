import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferenceViewComponent } from './components/view';
import { ReferenceFormComponent } from './components/form';

const routes: Routes = [
    { path: 'reference', component: ReferenceViewComponent },
    { path: 'reference/view/:id', component: ReferenceViewComponent },
    { path: 'reference/form/:id', component: ReferenceFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ReferenceRoutingModule { }
