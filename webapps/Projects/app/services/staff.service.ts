import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Organization, User } from '../models';
import { createURLSearchParams } from '../utils/utils';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Injectable()
export class StaffService {

    constructor(
        private http: Http
    ) { }

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
            });
    }

    fetchUsers() {
        return this.http.get('p?id=users', { headers: HEADERS })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    users: <User[]>data.list
                }
            });
    }
}
