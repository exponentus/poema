import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import {
    FETCH_USERS,
    FETCH_ORGANIZATIONS
} from '../reducers/staff.reducer';
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
                    type: FETCH_ORGANIZATIONS,
                    payload: {
                        organizations: <Organization[]>data.list,
                        meta: data.meta
                    }
                }
            });
    }

    fetchUsers() {
        return this.http.get('p?id=users', { headers: HEADERS })
            .map(response => {
                return {
                    type: FETCH_USERS,
                    payload: {
                        users: <User[]>response.json().objects[0].list
                    }
                }
            });
    }
}
