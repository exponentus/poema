import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffActions } from './staff.actions';
import { staffReducer } from './staff.reducer';
import { StaffService } from './staff.service';

@NgModule({
    declarations: [],
    exports: [],
    imports: [CommonModule],
    providers: [
        StaffService
    ]
})

export class StaffModule { }
