import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { createURLSearchParams } from '../utils/utils';
import { Organization, User } from '../models';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Injectable()
export class StaffService {

    constructor(
        private http: Http
    ) { }

    getOrganizations(queryParams?) {
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

    getOrganizationById(id: string) {
        return this.getOrganizations({ ids: id });
    }

    getUsers() {
        return this.http.get('p?id=users', { headers: HEADERS })
            .map(response => <User[]>response.json().objects[0].list);
    }
}
