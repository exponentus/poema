import { NgModule } from '@angular/core';

import {
    DateFormatPipe,
    DateDurationPipe,
    TextTransformPipe,
    LocalizedNamePipe,
    KeysPipe,
    ValuesPipe
} from './index';

@NgModule({
    declarations: [
        DateFormatPipe,
        DateDurationPipe,
        TextTransformPipe,
        LocalizedNamePipe,
        KeysPipe,
        ValuesPipe
    ],
    exports: [
        DateFormatPipe,
        DateDurationPipe,
        TextTransformPipe,
        LocalizedNamePipe,
        KeysPipe,
        ValuesPipe
    ]
})

export class PipesModule { }
