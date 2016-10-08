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

    fetchOrganizations(queryParams = {}) {
        return this.fetch({ id: 'get-organizations' }, 2).map(payload => {
            return {
                organizations: <Organization[]>payload.list,
                meta: payload.meta
            }
        });
    }

    fetchEmployees() {
        return this.fetch({ id: 'employees' }, 2).map(payload => {
            return {
                employees: <Employee[]>payload.list,
                meta: payload.meta
            }
        });
    }
}
