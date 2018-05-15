import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import {
    IEntity, IDto, IEntityService,
    DataService, createApiUrl
} from '@nb/core';

import { Project } from '../models';

@Injectable()
export class ProjectService implements IEntityService<IEntity> {

    constructor(
        private ngxTranslate: TranslateService,
        private dataService: DataService
    ) { }

    getProjectStatusTypes(enums: string[]) {
        return this.ngxTranslate.get(enums.map(t => t.toLowerCase())).pipe(map(ts => {
            let result: any[] = [];
            for (let t in ts) {
                result.push({ id: t.toUpperCase(), title: t, сls: 'status-' + t });
            }
            return result;
        }));
    }

    fetchUrl(url: string, params: any) {
        return this.dataService.apiGet(createApiUrl(url), params);
    }

    convertToDto(model: IEntity): IDto {
        return Project.convertToDto(<Project>model);
    }
}
