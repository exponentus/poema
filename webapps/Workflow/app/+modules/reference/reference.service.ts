import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AppService, DataService } from '../../services';
import { Tag, TaskType, RequestType } from './models';
import { xhrHeaders, createURLSearchParams, parseResponseObjects } from '../../utils/utils';

@Injectable()
export class ReferenceService {

    constructor(
        private http: Http,
        private appService: AppService,
        private dataService: DataService
    ) { }

    fetch(params: any, retry = 1) {
        return this.dataService.get('/Reference/p', params, retry);
    }

    fetchOne(params: any) {
        return this.http.get('/Reference/p', { headers: xhrHeaders(), search: createURLSearchParams(params) })
            .retry(3)
            .map(response => {
                let data = parseResponseObjects(response.json().objects);
                return data;
            })
            .catch(error => this.appService.handleError(error));
    }

    fetchTags() {
        return this.http.get('/Reference/p?id=tags', { headers: xhrHeaders() })
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
        return this.http.get('/Reference/p?id=tasktypes', { headers: xhrHeaders() })
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
        return this.http.get('/Reference/p?id=request-types', { headers: xhrHeaders() })
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
