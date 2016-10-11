import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferenceContainerComponent } from './components/container';
import { ReferenceViewComponent } from './components/view';
import { ReferenceFormComponent } from './components/form';

const routes: Routes = [{
    path: 'Reference', component: ReferenceContainerComponent,
    children: [
        { path: '', redirectTo: 'country-view', pathMatch: 'full' },
        { path: ':viewId/:docId', component: ReferenceFormComponent },
        { path: ':viewId', component: ReferenceViewComponent }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ReferenceRoutingModule { }
