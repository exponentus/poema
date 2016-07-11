import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from 'ng2-translate/ng2-translate';

import {
    FETCH_TASKS,
    FETCH_TASK,
    ADD_TASK
} from '../reducers/tasks.reducer';
import {
    FETCH_COMMENTS,
    FETCH_REQUESTS
} from '../reducers/task.reducer';
import { Task, Request, Comment, Attachment } from '../models';
import { createURLSearchParams, parseResponseObjects, serializeObj, transformPostResponse } from '../utils/utils';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Injectable()
export class TaskService {

    constructor(
        private http: Http,
        private translate: TranslateService
    ) { }

    getTaskPriorityTypes() {
        return this.translate.get(['urgent', 'high', 'medium', 'normal']).map(t => [
            { value: 'NORMAL', text: t.normal, default: true },
            { value: 'MEDIUM', text: t.medium },
            { value: 'HIGH', text: t.high },
            { value: 'URGENT', text: t.urgent }
        ]);
    }

    getTaskStatusTypes() {
        return this.translate.get(['draft', 'waiting', 'processed', 'finished']).map(t => [
            { value: 'DRAFT', text: t.draft, default: true },
            { value: 'WAITING', text: t.waiting },
            { value: 'PROCESSED', text: t.processed },
            { value: 'FINISHED', text: t.finished }
        ]);
    }

    fetchTasks(queryParams = {}) {
        return this.http.get('p?id=task-view', {
            headers: HEADERS,
            search: createURLSearchParams(queryParams)
        })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    type: FETCH_TASKS,
                    payload: {
                        tasks: <Task[]>data.list,
                        meta: data.meta
                    }
                }
            });
    }

    fetchTaskById(taskId: string) {
        if (taskId === 'new') {
            return Observable.of({
                type: FETCH_TASK,
                payload: {
                    task: new Task()
                }
            });
        }

        return this.http.get('p?id=task-form&taskId=' + taskId, { headers: HEADERS })
            .map(response => {
                let data = parseResponseObjects(response.json().objects);
                let task = <Task>data.task;
                if (data.fsid) {
                    task.fsid = data.fsid;
                }
                if (data.attachment) {
                    task.attachments = <Attachment[]>data.attachment.list;
                }
                return {
                    type: FETCH_TASK,
                    payload: {
                        task: <Task>task
                    }
                }
            });
    }

    saveTask(task: Task) {
        let url = 'p?id=task-form' + (task.id ? '&taskId=' + task.id : '');
        return this.http.post(url, serializeObj(task), { headers: HEADERS })
            .map(response => transformPostResponse(response))
            .catch(error => Observable.throw(transformPostResponse(error)));
    }

    deleteTask(tasks: Task[]) {
        return this.http.delete('p?id=task-view&taskIds=' + tasks.map(it => it.id).join(','));
    }

    deleteTaskAttachment(task: Task, attachment: Attachment) {
        return this.http.delete('p?id=task-form&taskId=' + task.id + '&attachmentId=' + attachment.id);
    }

    fetchTaskRequests(task: Task, page = 0) {
        return this.http.get('p?id=task-requests&taskId=' + task.id, { headers: HEADERS })
            .map(response => parseResponseObjects(response.json().objects).request || {})
            .map(data => {
                return {
                    type: FETCH_REQUESTS,
                    payload: {
                        requests: <Request[]>data.list,
                        meta: data.meta
                    }
                }
            });
    }

    sendTaskRequest(request: Request) {
        let url = 'p?id=task-requests&taskId=' + request.taskId;
        return this.http.post(url, serializeObj(request), { headers: HEADERS })
            .map(response => transformPostResponse(response))
            .catch(error => Observable.throw(transformPostResponse(error)));
    }

    doRequestResolution(request: Request, resolution: string) {
        let url = 'p?id=task-requests&requestId=' + request.id + '&resolution=' + resolution;
        return this.http.put(url, '', { headers: HEADERS })
            .map(response => transformPostResponse(response))
            .catch(error => Observable.throw(transformPostResponse(error)));
    }

    deleteRequest(request: Request) {
        return this.http.delete('p?id=task-requests&requestId=' + request.id);
    }

    deleteRequestAttachment(request: Request, attachment: Attachment) {
        return this.http.delete('p?id=task-requests&requestId=' + request.id + '&attachmentId=' + attachment.id);
    }

    fetchComments(task: Task, page = 0) {
        return this.http.get('p?id=comments&taskId=' + task.id, { headers: HEADERS })
            .map(response => parseResponseObjects(response.json().objects).comment || {})
            .map(data => {
                return {
                    type: FETCH_COMMENTS,
                    payload: {
                        comments: <Comment[]>data.list,
                        meta: data.meta
                    }
                }
            });
    }

    saveComment(task: Task, comment: Comment) {
        let url = 'p?id=comments&taskId=' + task.id + (comment.id ? '&commentId=' + comment.id : '');
        return this.http.post(url, serializeObj(comment), { headers: HEADERS })
            .map(response => transformPostResponse(response))
            .catch(error => Observable.throw(transformPostResponse(error)));
    }

    deleteComment(comment: Comment) {
        return this.http.delete('p?id=comments&commentId=' + comment.id);
    }

    deleteCommentAttachment(comment: Comment, attachment: Attachment) {
        return this.http.delete('p?id=comments&commentId=' + comment.id + '&attachmentId=' + attachment.id);
    }
}
