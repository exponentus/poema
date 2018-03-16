import { Injectable } from '@angular/core';

import { IEntity, IDto, IEntityService } from '@nb/core';
import { DataService } from '@nb/core';
import { createApiUrl } from '@nb/core';
import { Request } from '../models';

@Injectable()
export class RequestService implements IEntityService<IEntity> {

    constructor(
        private dataService: DataService
    ) { }

    fetchUrl(url: string, params: any) {
        return this.dataService.apiGet(createApiUrl(url), params);
    }

    convertToDto(model: IEntity): IDto {
        return Request.convertToDto(<Request>model);
    }
}
