import { Pipe } from '@angular/core';

import { AppService } from '../services';

@Pipe({ name: 'localizedName' })
export class LocalizedNamePipe {

    constructor(private appService: AppService) { }

    transform(model: any, field: string, locale: string): string {
        if (model) {
            let _field = field || 'name',
                _locale = locale || this.appService.language;

            if (model.localizedName) {
                return model.localizedName[_locale] || model[_field];
            } else if (model[_field]) {
                if (model[_field].localizedName) {
                    return model[_field].localizedName[_locale] || model[_field];
                } else {
                    return model[_field];
                }
            }
        }

        return '';
    }
}
