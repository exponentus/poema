import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AppService } from './app.service';
import { xhrHeaders, xhrJsonHeaders, createURLSearchParams, serializeObj } from '../utils/utils';

@Injectable()
export class DataService {

    constructor(
        private http: Http,
        private appService: AppService
    ) { }

    get(url: string, params = {}, retry = 1) {
        return this.http.get(url, {
            headers: xhrHeaders(),
            search: createURLSearchParams(params)
        })
            .retry(retry)
            .take(1)
            .map(response => response.json())
            .catch(error => this.appService.handleError(error));
    }

    post(url: string, params = {}, data: any) {
        return this.http.post(url, serializeObj(data), {
            headers: xhrHeaders(),
            search: createURLSearchParams(params)
        })
            .map(response => response.json())
            .catch(error => this.appService.handleError(error));
    }

    put(url: string, params = {}, data: any) {
        return this.http.put(url, data, {
            headers: xhrHeaders(),
            search: createURLSearchParams(params)
        })
            .map(response => response.json())
            .catch(error => this.appService.handleError(error));
    }

    delete(url: string, params = {}) {
        return this.http.delete(url, {
            headers: xhrHeaders(),
            search: createURLSearchParams(params)
        })
            .map(response => response.json())
            .catch(error => this.appService.handleError(error));
    }

    //
    apiGet(url: string, params = {}, retry = 1) {
        return this.http.get(url, {
            headers: xhrJsonHeaders(),
            search: createURLSearchParams(params)
        })
            .retry(retry)
            .take(1)
            .map(response => response.json())
            .catch(error => this.appService.handleError(error));
    }

    apiPost(url: string, params = {}, data: any) {
        return this.http.post(url, JSON.stringify(data), {
            headers: xhrJsonHeaders(),
            search: createURLSearchParams(params)
        })
            .map(response => response.json())
            .catch(error => this.appService.handleError(error));
    }

    apiPut(url: string, params = {}, data: any) {
        return this.http.put(url, JSON.stringify(data), {
            headers: xhrJsonHeaders(),
            search: createURLSearchParams(params)
        })
            .map(response => response.json())
            .catch(error => this.appService.handleError(error));
    }
}
