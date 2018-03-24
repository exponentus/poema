import { Injectable } from '@angular/core';

import { IDto, IEntityService, DataService, createApiUrl } from '@nb/core';

import { Outgoing } from '../models';

@Injectable()
export class OutgoingService implements IEntityService<Outgoing> {

    constructor(
        private dataService: DataService
    ) { }

    fetchUrl(url: string, params: any) {
        return this.dataService.apiGet(createApiUrl(url), params);
    }

    convertToDto(model: Outgoing): IDto {
        return Outgoing.convertToDto(model);
    }
}
