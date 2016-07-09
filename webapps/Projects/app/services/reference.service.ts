import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Store } from '@ngrx/store';

import {
    FETCH_TAGS,
    FETCH_TASK_TYPES,
    FETCH_REQUEST_TYPES
} from '../reducers/reference.reducer';
import { Tag, TaskType, RequestType } from '../models';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Injectable()
export class ReferenceService {

    constructor(
        private http: Http,
        private store: Store<any>
    ) { }

    loadReference() {
        this.fetchTags().subscribe(action => {
            this.store.dispatch(action);
        });
        this.fetchTaskTypes().subscribe(action => {
            this.store.dispatch(action);
        });
        this.fetchRequestTypes().subscribe(action => {
            this.store.dispatch(action);
        });
    }

    fetchTags() {
        return this.http.get('/Reference/p?id=tags', { headers: HEADERS })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    type: FETCH_TAGS,
                    payload: {
                        tags: <Tag[]>data.list,
                        meta: data.meta
                    }
                }
            });
    }

    fetchTaskTypes() {
        return this.http.get('/Reference/p?id=tasktypes', { headers: HEADERS })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    type: FETCH_TASK_TYPES,
                    payload: {
                        taskTypes: <TaskType[]>data.list,
                        meta: data.meta
                    }
                }
            });
    }

    fetchRequestTypes() {
        return this.http.get('/Reference/p?id=request-types', { headers: HEADERS })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    type: FETCH_REQUEST_TYPES,
                    payload: {
                        requestTypes: <RequestType[]>data.list,
                        meta: data.meta
                    }
                }
            });
    }
}
