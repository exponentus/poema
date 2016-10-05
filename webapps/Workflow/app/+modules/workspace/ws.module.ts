import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';

import { WorkspaceRoutingModule } from './ws.routing';
import { WorkspaceComponent } from './ws.component';
import { WorkspaceService } from './ws.service';

@NgModule({
    declarations: [
        WorkspaceComponent
    ],
    imports: [
        SharedModule,
        WorkspaceRoutingModule
    ],
    providers: [
        WorkspaceService
    ]
})

export class WorkspaceModule { }
