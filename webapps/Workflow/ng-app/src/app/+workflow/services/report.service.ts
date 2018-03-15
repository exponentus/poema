import { Injectable } from '@angular/core';

import { IDto, IEntityService } from '@nb/core';
import { DataService } from '@nb/core';
import { createApiUrl } from '@nb/core';
import { Report } from '../models';

@Injectable()
export class ReportService implements IEntityService<Report> {

    constructor(
        private dataService: DataService
    ) { }

    fetchUrl(url: string, params: any) {
        return this.dataService.apiGet(createApiUrl(url), params);
    }

    convertToDto(model: Report): IDto {
        return Report.convertToDto(model);
    }
}
