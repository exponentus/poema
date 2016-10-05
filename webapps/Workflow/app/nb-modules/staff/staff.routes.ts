import { Routes } from '@angular/router';

import { StaffIndexComponent } from './components/index';

export const STAFF_ROUTES: Routes = [
    { path: 'staff', component: StaffIndexComponent },
    { path: 'staff/:id', component: StaffIndexComponent }
];
