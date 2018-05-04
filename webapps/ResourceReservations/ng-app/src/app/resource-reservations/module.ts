import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    NbCommonModule, ApprovalModule, NbAclModule,
    NBEntityCreationDetailsModule
} from '@nb/core';

import { RR_ROUTES } from './routes';
import { RRContainerComponent } from './components/container';
import { ApplicationFormComponent } from './components/application/application-form';
import { ApplicationForVehicleFormComponent } from './components/application-for-vehicle/application-for-vehicle-form';
import { ApplicationForMeetingRoomFormComponent } from './components/application-for-meeting-room/application-for-meeting-room-form';

import { ApplicationForVehicleService } from './services/application-for-vehicle.service';
import { ApplicationForMeetingRoomService } from './services/application-for-meeting-room.service';
import { ValueObjectService } from './services/value-object.service';

@NgModule({
    declarations: [
        RRContainerComponent,
        ApplicationFormComponent,
        ApplicationForVehicleFormComponent,
        ApplicationForMeetingRoomFormComponent
    ],
    imports: [
        NbCommonModule,
        ApprovalModule,
        NbAclModule,
        NBEntityCreationDetailsModule,
        RouterModule.forChild(RR_ROUTES)
    ],
    providers: [
        ApplicationForVehicleService,
        ApplicationForMeetingRoomService,
        ValueObjectService
    ]
})
export class ResourceReservationsModule { }
