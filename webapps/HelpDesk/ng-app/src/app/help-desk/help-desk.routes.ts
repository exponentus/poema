import { Routes } from '@angular/router';

import { AuthGuard, ViewPage, UserProfileComponent, OfflinePage } from '@nb/core';
import { HelpDeskContainerComponent, DemandComponent } from './components';

export const HELPDESK_ROUTES: Routes = [{
    path: 'HelpDesk', component: HelpDeskContainerComponent, canActivate: [AuthGuard],
    children: [
        { path: '', redirectTo: 'demands', pathMatch: 'full' },
        { path: 'index', redirectTo: 'demands', pathMatch: 'full' },
        { path: 'offline', component: OfflinePage },
        { path: 'search', component: ViewPage },
        { path: 'user-profile', component: UserProfileComponent },
        {
            path: 'demands/s/:slug', component: ViewPage, data: {
                url: '/HelpDesk/demands',
                filterId: 'helpdesk_demand'
            }
        },
        { path: 'demands/:id', component: DemandComponent },
        { path: 'demands', component: ViewPage, data: { filterId: 'helpdesk_demand' } }
    ]
}];
