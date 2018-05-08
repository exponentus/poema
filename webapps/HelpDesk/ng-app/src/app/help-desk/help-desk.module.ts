import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    NbCommonModule,
    NbAclModule, NbActivityModule,
    NBEntityCreationDetailsModule
} from '@nb/core';

import { HELPDESK_ROUTES } from './help-desk.routes';
import { DemandService } from './services/demand.service';

import {
    HelpDeskContainerComponent,
    DemandComponent,
    DemandTaskEditComponent
} from './components';

@NgModule({
    declarations: [
        HelpDeskContainerComponent,
        DemandComponent,
        DemandTaskEditComponent
    ],
    imports: [
        NbCommonModule,
        NbAclModule,
        NbActivityModule,
        NBEntityCreationDetailsModule,
        RouterModule.forChild(HELPDESK_ROUTES)
    ],
    providers: [
        DemandService
    ]
})
export class HelpDeskModule { }
