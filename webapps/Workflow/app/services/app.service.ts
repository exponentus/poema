import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { xhrHeaders, parseResponseObjects, serializeObj, transformPostResponse } from '../utils/utils';

@Injectable()
export class AppService {

    thumbnailSupportedFormat: string[] = ['jpeg', 'jpg', 'png', 'gif']
    isLogged: boolean = false;
    language: string = 'RUS';
    employee: any;
    workspaceUrl: string;

    constructor(private http: Http) {
        let ck = document.cookie.match('(lang)=(.*?)($|;|,(?! ))');
        if (ck) {
            this.language = ck[2];
        }
    }

    fetchSession() {
        return this.http.get('do/session', { headers: xhrHeaders() })
            .retry(3)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }

    fetchUserProfile() {
        return this.http.get('p?id=userprofile', { headers: xhrHeaders() })
            .retry(3)
            .map(response => {
                let res = parseResponseObjects(response.json().objects);
                let pageSize = 20;
                if (res.pagesize) {
                    pageSize = res.pagesize
                }
                this.isLogged = true;
                this.language = res.currentLang;
                this.employee = res.employee;
                this.workspaceUrl = res.workspaceUrl;
                return {
                    userProfile: res.employee,
                    languages: res.language.list[0].localizedName,
                    pageSize: pageSize,
                    language: res.currentLang || this.language,
                    workspaceUrl: res.workspaceUrl
                }
            })
            .catch(error => this.handleError(error));
    }

    updateUserProfile(userForm: any) {
        return this.http.post('p?id=userprofile', serializeObj(userForm), { headers: xhrHeaders() })
            .map(response => response.json())
            .catch(error => Observable.throw(transformPostResponse(error)));
    }

    logout() {
        // return this.http.delete('/');
        window.location.href = this.workspaceUrl;
    }

    handleError(error: any) {
        if (error.status === 401) {
            this.logout();
        } else if (error.status === 401) {
            console.log(error);
        }
        return Observable.throw(transformPostResponse(error));
    }
}
