import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferenceContainerComponent } from './components/container';
import { ReferenceViewComponent } from './components/view';
import { ReferenceFormComponent } from './components/form';

const routes: Routes = [{
    path: 'reference', component: ReferenceContainerComponent,
    children: [
        { path: '', redirectTo: 'view/country-view', pathMatch: 'full' },
        { path: 'view/:id', component: ReferenceViewComponent },
        { path: 'form/:id', component: ReferenceFormComponent }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ReferenceRoutingModule { }
