import { Injectable } from '@angular/core';

import { IEntity, IDto, IEntityService, DataService, createApiUrl } from '@nb/core';

import { Demand } from '../models/demand';

@Injectable()
export class DemandService implements IEntityService<Demand> {

    constructor(
        private dataService: DataService
    ) { }

    fetchUrl(url: string, params: any) {
        return this.dataService.apiGet(createApiUrl(url), params);
    }

    convertToDto(model: IEntity): IDto {
        let demand: Demand = <any>model;
        return Demand.convertToDto(demand);
    }
}
