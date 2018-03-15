import { Injectable } from '@angular/core';

import { IDto, IEntityService } from '@nb/core';
import { DataService } from '@nb/core';
import { createApiUrl } from '@nb/core';
import { OfficeMemo } from '../models';

@Injectable()
export class OfficeMemoService implements IEntityService<OfficeMemo> {

    constructor(
        private dataService: DataService
    ) { }

    fetchUrl(url: string, params: any) {
        return this.dataService.apiGet(createApiUrl(url), params);
    }

    convertToDto(model: OfficeMemo): IDto {
        return OfficeMemo.convertToDto(model);
    }
}
