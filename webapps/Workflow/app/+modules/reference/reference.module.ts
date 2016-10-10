import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';

import { ReferenceRoutingModule } from './reference.routing';
import { ReferenceService } from './reference.service';

import { ReferenceContainerComponent } from './components/container';
import { ReferenceViewComponent } from './components/view';
import { ReferenceFormComponent } from './components/form';

@NgModule({
    declarations: [
        ReferenceContainerComponent,
        ReferenceViewComponent,
        ReferenceFormComponent
    ],
    exports: [],
    imports: [
        SharedModule,
        ReferenceRoutingModule
    ],
    providers: [
        ReferenceService
    ]
})

export class ReferenceModule { }
