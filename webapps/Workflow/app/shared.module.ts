import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate/ng2-translate';

import { SharedModule as _SharedModule } from './shared/shared.module';
import { AclComponent } from './components/acl/acl';
import { AttachmentsComponent } from './components/attachment/attachments';
import { ListPageComponent } from './components/list-page/list-page';
import { DateFormatPipe, DateDurationPipe, TextTransformPipe, LocalizedNamePipe, KeysPipe, ValuesPipe } from './pipes';

@NgModule({
    declarations: [
        AclComponent,
        AttachmentsComponent,
        ListPageComponent,
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
        AclComponent,
        AttachmentsComponent,
        ListPageComponent,
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
    ]
})

export class SharedModule { }
