import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Tag, TaskType, RequestType } from '../models';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Injectable()
export class ReferenceService {

    constructor(
        private http: Http
    ) { }

    fetchTags() {
        return this.http.get('/Reference/p?id=tags', { headers: HEADERS })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    tags: <Tag[]>data.list,
                    meta: data.meta
                };
            });
    }

    fetchTaskTypes() {
        return this.http.get('/Reference/p?id=tasktypes', { headers: HEADERS })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    taskTypes: <TaskType[]>data.list,
                    meta: data.meta
                };
            });
    }

    fetchRequestTypes() {
        return this.http.get('/Reference/p?id=request-types', { headers: HEADERS })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    requestTypes: <RequestType[]>data.list,
                    meta: data.meta
                };
            });
    }
}
