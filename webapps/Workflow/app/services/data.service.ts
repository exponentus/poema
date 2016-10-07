import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppService } from './app.service';
import { xhrHeaders, createURLSearchParams, parseResponseObjects, serializeObj, transformPostResponse } from '../utils/utils';

@Injectable()
export class DataService {

    constructor(
        private http: Http,
        private appService: AppService
    ) { }

    get(url: string, params: any = {}) {
        return this.http.get(url, { headers: xhrHeaders(), search: createURLSearchParams(params) })
            .retry(2)
            .map(response => {

            })
            .catch(error => this.appService.handleError(error));
    }

    post(url: string, params: any = {}, data: any) {

    }

    put(url: string, params: any = {}, data: any) {

    }

    delete(url: string, params: any = {}) {

    }
}
