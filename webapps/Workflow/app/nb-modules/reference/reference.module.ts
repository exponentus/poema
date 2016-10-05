import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';

import { ReferenceActions } from './reference.actions';
import { ReferenceService } from './reference.service';

import { ReferenceViewComponent } from './components/view';
import { ReferenceFormComponent } from './components/form';

@NgModule({
    declarations: [
        ReferenceViewComponent,
        ReferenceFormComponent
    ],
    exports: [],
    imports: [
        SharedModule
    ],
    providers: [
        ReferenceActions,
        ReferenceService
    ]
})

export class ReferenceModule { }
