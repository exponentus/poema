import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate/ng2-translate';

import { SharedModule as _SharedModule } from './shared/shared.module';

import { NbModalService, NbModalComponent } from './components/nb-modal';
import { SchemaFormComponent } from './components/schema-form/schema-form';
import { NavComponent } from './components/nav/nav';
import { NavTreeComponent } from './components/nav/nav-tree';
import { SelectionComponent } from './components/selection/selection';
import { AclComponent } from './components/acl/acl';
import { AttachmentsComponent } from './components/attachment/attachments';
import { ViewPageComponent } from './components/view-page/view-page';
import { ErrorMessageComponent } from './components/shared';
import { DateFormatPipe, DateDurationPipe, TextTransformPipe, LocalizedNamePipe, KeysPipe, ValuesPipe } from './pipes';

@NgModule({
    declarations: [
        NbModalComponent,
        SchemaFormComponent,
        NavComponent,
        NavTreeComponent,
        SelectionComponent,
        AclComponent,
        AttachmentsComponent,
        ViewPageComponent,
        ErrorMessageComponent,
        DateFormatPipe,
        DateDurationPipe,
        TextTransformPipe,
        LocalizedNamePipe,
        KeysPipe,
        ValuesPipe
    ],
    exports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        NbModalComponent,
        SchemaFormComponent,
        NavComponent,
        NavTreeComponent,
        SelectionComponent,
        AclComponent,
        AttachmentsComponent,
        ViewPageComponent,
        ErrorMessageComponent,
        _SharedModule,
        DateFormatPipe,
        DateDurationPipe,
        TextTransformPipe,
        LocalizedNamePipe,
        KeysPipe,
        ValuesPipe
    ],
    imports: [
        CommonModule,
        HttpModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        _SharedModule
    ],
    providers: [
        NbModalService
    ]
})

export class SharedModule { }
