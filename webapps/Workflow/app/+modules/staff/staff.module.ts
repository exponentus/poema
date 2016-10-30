import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';

import { StaffRoutingModule } from './staff.routing';
import { StaffService } from './staff.service';

import { StaffContainerComponent } from './components/container';
import { StaffViewComponent } from './components/view';
import { StaffFormComponent } from './components/form';

@NgModule({
    declarations: [
        StaffContainerComponent,
        StaffViewComponent,
        StaffFormComponent
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
