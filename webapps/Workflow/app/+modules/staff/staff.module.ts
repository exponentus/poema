import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';

import { StaffRoutingModule } from './staff.routing';
import { StaffActions } from './staff.actions';
import { StaffService } from './staff.service';

import { StaffIndexComponent } from './components/index';

@NgModule({
    declarations: [
        StaffIndexComponent
    ],
    exports: [],
    imports: [
        SharedModule,
        StaffRoutingModule
    ],
    providers: [
        StaffActions,
        StaffService
    ]
})

export class StaffModule { }
