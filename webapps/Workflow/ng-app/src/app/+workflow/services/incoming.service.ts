import { Injectable } from '@angular/core';

import { IDto, IEntityService } from '@nb/core';
import { DataService } from '@nb/core';
import { createApiUrl } from '@nb/core';
import { Incoming } from '../models';

@Injectable()
export class IncomingService implements IEntityService<Incoming> {

    constructor(
        private dataService: DataService
    ) { }

    fetchUrl(url: string, params: any) {
        return this.dataService.apiGet(createApiUrl(url), params);
    }

    convertToDto(model: Incoming): IDto {
        return Incoming.convertToDto(model);
    }
}
