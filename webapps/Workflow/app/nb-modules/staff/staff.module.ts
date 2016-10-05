import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';

import { StaffActions } from './staff.actions';
import { StaffService } from './staff.service';

import { StaffIndexComponent } from './components/index';

@NgModule({
    declarations: [
        StaffIndexComponent
    ],
    exports: [],
    imports: [
        SharedModule
    ],
    providers: [
        StaffActions,
        StaffService
    ]
})

export class StaffModule { }
