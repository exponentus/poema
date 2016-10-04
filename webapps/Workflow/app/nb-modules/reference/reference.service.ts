import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AppService } from '../../services/app.service';
import { Tag, TaskType, RequestType } from './models';
import { createURLSearchParams, parseResponseObjects } from '../../utils/utils';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Injectable()
export class ReferenceService {

    constructor(
        private http: Http,
        private appService: AppService
    ) { }

    fetchList(params: any) {
        return this.http.get('/Reference/p', { headers: HEADERS, search: createURLSearchParams(params) })
            .retry(3)
            .map(response => response.json().objects[1])
            .map(data => {
                return {
                    list: <any[]>data.list,
                    meta: data.meta
                };
            })
            .catch(error => this.appService.handleError(error));
    }

    fetchOne(params: any) {
        return this.http.get('/Reference/p', { headers: HEADERS, search: createURLSearchParams(params) })
            .retry(3)
            .map(response => {
                let data = parseResponseObjects(response.json().objects);
                return data;
            })
            .catch(error => this.appService.handleError(error));
    }

    fetchTags() {
        return this.http.get('/Reference/p?id=tags', { headers: HEADERS })
            .retry(3)
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    tags: <Tag[]>data.list,
                    meta: data.meta
                };
            })
            .catch(error => this.appService.handleError(error));
    }

    fetchTaskTypes() {
        return this.http.get('/Reference/p?id=tasktypes', { headers: HEADERS })
            .retry(3)
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    taskTypes: <TaskType[]>data.list,
                    meta: data.meta
                };
            })
            .catch(error => this.appService.handleError(error));
    }

    fetchRequestTypes() {
        return this.http.get('/Reference/p?id=request-types', { headers: HEADERS })
            .retry(3)
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    requestTypes: <RequestType[]>data.list,
                    meta: data.meta
                };
            })
            .catch(error => this.appService.handleError(error));
    }
}
