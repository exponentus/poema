import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Comment } from '../models';
import { createURLSearchParams, serializeObj } from '../utils/utils';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Injectable()
export class CommentService {

    constructor(
        private http: Http
    ) { }

    fetchTaskComments(taskId: string, page = 0) {
        return this.http.get('p?id=comments&taskId=' + taskId, { headers: HEADERS })
            .map(response => <Comment>response.json().objects[1]);
    }
}
