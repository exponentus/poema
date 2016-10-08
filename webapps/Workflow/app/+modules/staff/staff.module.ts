import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';

import { StaffRoutingModule } from './staff.routing';
import { StaffService } from './staff.service';

import { StaffContainerComponent } from './components/container';
import { StaffViewComponent } from './components/view';

@NgModule({
    declarations: [
        StaffContainerComponent,
        StaffViewComponent
    ],
    exports: [],
    imports: [
        SharedModule,
        StaffRoutingModule
    ],
    providers: [
        StaffService
    ]
})

export class StaffModule { }
