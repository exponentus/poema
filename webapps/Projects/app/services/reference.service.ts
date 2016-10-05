import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AppService } from './app.service';
import { Tag, TaskType, RequestType } from '../models';
import { xhrHeaders } from '../utils/utils';

@Injectable()
export class ReferenceService {

    constructor(
        private http: Http,
        private appService: AppService
    ) { }

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
