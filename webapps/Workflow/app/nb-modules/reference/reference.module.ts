import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';

import { ReferenceActions } from './reference.actions';
import { referenceReducer } from './reference.reducer';
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
        ReferenceService
    ]
})

export class ReferenceModule { }
