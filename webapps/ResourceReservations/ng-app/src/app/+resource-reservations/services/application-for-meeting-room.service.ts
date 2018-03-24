import { Injectable } from '@angular/core';

import {
    IEntity, IDto, IEntityService,
    DataService, createApiUrl
} from '@nb/core';

import { ApplicationForMeetingRoom } from '../models';
import { RR_URL } from '../constants';
import { convertToDto } from '../converter-factory';

@Injectable()
export class ApplicationForMeetingRoomService implements IEntityService<ApplicationForMeetingRoom> {

    constructor(
        private dataService: DataService
    ) { }

    fetchUrl(url: string, params: any) {
        return this.dataService.apiGet(createApiUrl(url), params);
    }

    convertToDto(model: IEntity): IDto {
        return convertToDto(model);
    }
}
