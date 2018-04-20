import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import {
    IEntity, IDto, IEntityService,
    DataService, createApiUrl
} from '@nb/core';

import { Task } from '../models';

@Injectable()
export class TaskService implements IEntityService<IEntity> {

    constructor(
        private ngxTranslate: TranslateService,
        private dataService: DataService
    ) { }

    getPriorityTypes(enums: string[]) {
        return this.ngxTranslate.get(enums.map(t => t.toLowerCase())).map(ts => {
            let result: any[] = [];
            for (let t in ts) {
                result.push({ id: t.toUpperCase(), title: ts[t], сls: 'priority-' + t });
            }
            return result;
        });
    }

    fetchUrl(url: string, params: any) {
        return this.dataService.apiGet(createApiUrl(url), params);
    }

    convertToDto(model: IEntity): IDto {
        return Task.convertToDto(<Task>model);
    }
}
