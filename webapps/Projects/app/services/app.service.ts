import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';
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

    getTranslations() {
        if (this.translations) {
            return Observable.of(this.translations);
        }

        let headers = { headers: HEADERS };
        let url = 'p?id=common-captions';

        return this.http.get(url, headers).map(response => {
            this.translations = response.json().captions;
            return this.translations;
        });
    }

    getNav() {
        let headers = { headers: HEADERS };
        let url = 'p?id=outline';

        return this.http.get(url, headers).map(response => response.json().objects[0]);
    }

    getUsers() {
        let headers = { headers: HEADERS };
        let url = 'p?id=users';

        return this.http.get(url, headers)
            .map(response => <User[]>response.json().objects[0].list);
    }

    updateUserProfile(user: User) {
        //
    }

    logout() {
        return this.http.delete('/');
    }
}
