import { Pipe } from '@angular/core';

import { AppService } from '../services';

@Pipe({ name: 'localizedName' })
export class LocalizedNamePipe {

    constructor(private appService: AppService) { }

    transform(model: any, field: string, locale: string): string {
        return model ? model.localizedName[locale || this.appService.language] || model[field || 'name'] : '';
    }
}
