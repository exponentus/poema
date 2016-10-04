import { Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile';
import { LoginComponent } from './components/login';
import { Error404 } from './components/404';

import { REFERENCE_ROUTES } from './nb-modules/reference/reference.routes';
import { STAFF_ROUTES } from './nb-modules/staff/staff.routes';
import { WORKFLOW_ROUTES } from './nb-modules/workflow/workflow.routes';

export const APP_ROUTES: Routes = [
    ...REFERENCE_ROUTES,
    ...STAFF_ROUTES,
    ...WORKFLOW_ROUTES,
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', component: Error404 }
];
