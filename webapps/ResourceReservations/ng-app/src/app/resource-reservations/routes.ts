import { Routes } from '@angular/router';

import { AuthGuard, ViewPage, UserProfileComponent, OfflinePage } from '@nb/core';

import { RRContainerComponent } from './components/container';
import { ApplicationFormComponent } from './components/application/application-form';
import { ApplicationForVehicleFormComponent } from './components/application-for-vehicle/application-for-vehicle-form';
import { ApplicationForMeetingRoomFormComponent } from './components/application-for-meeting-room/application-for-meeting-room-form';

export const RR_ROUTES: Routes = [{
    path: 'ResourceReservations', component: RRContainerComponent, canActivate: [AuthGuard],
    children: [
        { path: '', redirectTo: 'applications', pathMatch: 'full' },
        { path: 'index', redirectTo: 'applications', pathMatch: 'full' },
        { path: 'offline', component: OfflinePage },
        { path: 'search', component: ViewPage },
        { path: 'user-profile', component: UserProfileComponent },

        { path: 'applications/for/:for', component: ViewPage, data: { filterId: 'application' } },
        { path: 'applications/my', component: ViewPage, data: { filterId: 'application' } },
        { path: 'applications/:id', component: ApplicationFormComponent },
        { path: 'applications', component: ViewPage, data: { filterId: 'application' } },

        { path: 'applications-for-vehicle/:id', component: ApplicationForVehicleFormComponent },
        { path: 'applications-for-vehicle', component: ViewPage, data: { filterId: 'applicationForVehicle' } },

        { path: 'applications-for-meeting-room/:id', component: ApplicationForMeetingRoomFormComponent },
        { path: 'applications-for-meeting-room', component: ViewPage, data: { filterId: 'applicationForMeetingRoom' } }
    ]
}];
