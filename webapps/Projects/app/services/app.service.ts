import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { User } from '../models';
import { parseResponseObjects, serializeObj } from '../utils/utils';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Injectable()
export class AppService {

    isLogged: boolean = false;
    language: string = 'RUS';

    constructor(private http: Http) {
        let ck = document.cookie.match('(lang)=(.*?)($|;|,(?! ))');
        if (ck) {
            this.language = ck[2];
        }
    }

    fetchUserProfile() {
        return this.http.get('p?id=userprofile', { headers: HEADERS }).map(
            response => {
                let res = parseResponseObjects(response.json().objects);
                let pageSize = 20;
                if (res[0].pagesize) {
                    pageSize = res[0].pagesize
                }
                this.isLogged = true;
                return {
                    userProfile: res.employee,
                    languages: res.language.list[0].localizedName,
                    pageSize: pageSize,
                    language: this.language
                }
            },
            error => {
                this.isLogged = false;
            }
        );
    }

    updateUserProfile(userForm: any) {
        return this.http.post('p?id=userprofile', serializeObj(userForm), { headers: HEADERS }).map(
            response => {
                return response;
            },
            error => {
                return error;
            }
        );
    }

    logout() {
        return this.http.delete('/');
    }
}
