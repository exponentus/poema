import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Task, Comment } from '../models';
import { createURLSearchParams, serializeObj, transformPostResponse } from '../utils/utils';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Injectable()
export class CommentService {

    constructor(
        private http: Http
    ) { }

    fetchTaskComments(task: Task, page = 0) {
        return this.http.get('p?id=comments&taskId=' + task.id, { headers: HEADERS })
            .map(response => <Comment>response.json().objects[0]);
    }

    addTaskComment(task: Task, comment: Comment) {
        let url = 'p?id=comments&taskId=' + task.id;
        return this.http.post(url, serializeObj(comment), { headers: HEADERS })
            .map(response => transformPostResponse(response))
            .catch(error => Observable.throw(transformPostResponse(error)));
    }
}
