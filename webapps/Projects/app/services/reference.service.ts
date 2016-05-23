import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Tag, TaskType } from '../models';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Injectable()
export class ReferenceService {

    constructor(
        private http: Http
    ) { }

    createURLSearchParams(_params): URLSearchParams {
        let params: URLSearchParams = new URLSearchParams();
        for (let p in _params) {
            params.set(encodeURIComponent(p), encodeURIComponent(_params[p]));
        }
        return params;
    }

    getTags() {
        let url = '/Reference/p?id=tags';

        return this.http.get(url, { headers: HEADERS })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    tags: <Tag[]>data.list,
                    meta: data.meta
                }
            });
    }

    getTaskTypes() {
        let url = '/Reference/p?id=tasktypes';

        return this.http.get(url, { headers: HEADERS })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    taskTypes: <TaskType[]>data.list,
                    meta: data.meta
                }
            });
    }
}
