import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';

import { ReferenceRoutingModule } from './reference.routing';
import { ReferenceActions } from './reference.actions';
import { ReferenceService } from './reference.service';

import { ReferenceIndexComponent } from './components/index/index';
import { ReferenceViewComponent } from './components/view';
import { ReferenceFormComponent } from './components/form';

@NgModule({
    declarations: [
        ReferenceIndexComponent,
        ReferenceViewComponent,
        ReferenceFormComponent
    ],
    exports: [],
    imports: [
        SharedModule,
        ReferenceRoutingModule
    ],
    providers: [
        ReferenceActions,
        ReferenceService
    ]
})

export class ReferenceModule { }
