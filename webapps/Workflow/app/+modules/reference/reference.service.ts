import { Injectable } from '@angular/core';

import { DataService } from '../../services';
import { Tag, TaskType, RequestType } from './models';

@Injectable()
export class ReferenceService {

    constructor(
        private dataService: DataService
    ) { }

    fetch(params: any, retry = 1) {
        return this.dataService.get('/Reference/p', params, retry);
    }

    fetchOne(params: any) {
        return this.fetch(params);
    }
}
