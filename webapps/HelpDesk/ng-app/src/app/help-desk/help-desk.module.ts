import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NbCommonModule } from '@nb/core';

import { HELPDESK_ROUTES } from './help-desk.routes';
import { DemandService } from './services/demand.service';

import { HelpDeskContainerComponent, DemandComponent } from './components';

@NgModule({
    declarations: [
        HelpDeskContainerComponent,
        DemandComponent
    ],
    imports: [
        NbCommonModule,
        RouterModule.forChild(HELPDESK_ROUTES)
    ],
    providers: [
        DemandService
    ]
})
export class HelpDeskModule { }
