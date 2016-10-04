import { Routes } from '@angular/router';

import { ReferenceViewComponent } from './components/view';
import { ReferenceFormComponent } from './components/form';

export const REFERENCE_ROUTES: Routes = [
    { path: 'reference', component: ReferenceViewComponent },
    { path: 'reference/view/:id', component: ReferenceViewComponent },
    { path: 'reference/form/:id', component: ReferenceFormComponent }
];
