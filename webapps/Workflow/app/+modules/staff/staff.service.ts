import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AppService } from '../../services';
import { Organization, Employee } from './models';
import { xhrHeaders, createURLSearchParams } from '../../utils/utils';

@Injectable()
export class StaffService {

    constructor(
        private http: Http,
        private appService: AppService
    ) { }

    fetchList(params: any) {
        return this.http.get('/Staff/p', { headers: xhrHeaders(), search: createURLSearchParams(params) })
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
            headers: xhrHeaders(),
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
        return this.http.get('/Staff/p?id=employees', { headers: xhrHeaders() })
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
