import { Injectable } from '@angular/core';

import { DataService } from '../../services';
import { Organization, Employee } from './models';

@Injectable()
export class StaffService {

    constructor(
        private dataService: DataService
    ) { }

    fetch(params: any, retry = 1) {
        return this.dataService.get('/Staff/p', params, retry);
    }
}
