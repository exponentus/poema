import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models';
import { parseResponseObjects } from '../utils/utils';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Injectable()
export class AppService {

    private translations: any;
    isLogged: boolean = false;

    constructor(
        private http: Http
    ) { }

    getUserProfile() {
        let headers = { headers: HEADERS };
        let url = 'p?id=userprofile';

        return this.http.get(url, headers).map(response => {
            return parseResponseObjects(response.json().objects)
        });
    }

    updateUserProfile(user: User) {
        //
    }

    logout() {
        return this.http.delete('/');
    }
}
