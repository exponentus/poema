import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AppService } from '../../services/app.service';
import { Organization, Employee } from './models';
import { createURLSearchParams } from '../../utils/utils';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Injectable()
export class StaffService {

    constructor(
        private http: Http,
        private appService: AppService
    ) { }

    fetchList(params: any) {
        return this.http.get('/Staff/p', { headers: HEADERS, search: createURLSearchParams(params) })
            .retry(3)
            .map(response => response.json().objects[1])
            .map(data => {
                return {
                    list: <any[]>data.list,
                    meta: data.meta
                };
            })
            .catch(error => this.appService.handleError(error));
    }

    fetchOrganizations(queryParams = {}) {
        return this.http.get('/Staff/p?id=get-organizations', {
            headers: HEADERS,
            search: createURLSearchParams(queryParams)
        })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    organizations: <Organization[]>data.list,
                    meta: data.meta
                }
            })
            .catch(error => this.appService.handleError(error));
    }

    fetchEmployees() {
        return this.http.get('/Staff/p?id=employees', { headers: HEADERS })
            .retry(3)
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    employees: <Employee[]>data.list
                }
            })
            .catch(error => this.appService.handleError(error));
    }
}
