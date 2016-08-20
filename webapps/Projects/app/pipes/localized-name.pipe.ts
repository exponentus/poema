import { Pipe } from '@angular/core';

import { AppService } from '../services';

@Pipe({ name: 'localizedName' })
export class LocalizedNamePipe {

    constructor(private appService: AppService) { }

    transform(model: any, field: string, locale: string): string {
        let _field = field || 'name';
        let _locale = locale || this.appService.language;

        return model ? (model.localizedName[_locale] || model[_field]) : '';
    }
}
