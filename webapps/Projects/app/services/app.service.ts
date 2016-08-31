import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Employee } from '../models';
import { parseResponseObjects, serializeObj, transformPostResponse } from '../utils/utils';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Injectable()
export class AppService {

    thumbnailSupportedFormat: string[] = ['jpeg', 'jpg', 'png', 'gif']
    isLogged: boolean = false;
    language: string = 'RUS';
    employee: Employee;

    constructor(private http: Http) {
        let ck = document.cookie.match('(lang)=(.*?)($|;|,(?! ))');
        if (ck) {
            this.language = ck[2];
        }
    }

    fetchUserProfile() {
        return this.http.get('/Staff/p?id=userprofile', { headers: HEADERS }).map(
            response => {
                let res = parseResponseObjects(response.json().objects);
                console.log(res);
                let pageSize = 20;
                if (res.pagesize) {
                    pageSize = res.pagesize
                }
                this.isLogged = true;
                this.language = res.currentLang;
                this.employee = res.employee as Employee;
                return {
                    userProfile: res.employee,
                    languages: res.language.list[0].localizedName,
                    pageSize: pageSize,
                    language: res.currentLang || this.language
                }
            },
            error => {
                this.isLogged = false;
            }
        );
    }

    updateUserProfile(userForm: any) {
        return this.http.post('/Staff/p?id=userprofile', serializeObj(userForm), { headers: HEADERS })
            .map(response => response.json())
            .catch(error => Observable.throw(transformPostResponse(error)));
    }

    logout() {
        return this.http.delete('/');
    }
}
