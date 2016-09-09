import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from 'ng2-translate/ng2-translate';
import * as moment from 'moment';

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


    //===================================
    //  TASK
    //-----------------------------------

    fetchTasks(queryParams = {}) {
        return this.http.get('p?id=task-view', {
            headers: HEADERS,
            search: createURLSearchParams(queryParams)
        })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    tasks: <Task[]>data.list,
                    meta: data.meta
                }
            });
    }

    fetchTaskStream(task: Task) {
        return this.http.get('p?id=task-view', {
            headers: HEADERS,
            search: createURLSearchParams({ taskId: task.id, stream: 1 })
        })
            .map(response => response.json().objects)
            .map(data => {
                let list = [];
                data.map(it => list = list.concat(it.list));
                list = list.sort(function(a: any, b: any) {
                    let r1 = moment(a.regDate, 'DD.MM.YYYY HH:mm').valueOf();
                    let r2 = moment(b.regDate, 'DD.MM.YYYY HH:mm').valueOf();
                    return r1 - r2;
                });
                return list;
            });
    }

    fetchTaskById(taskId: string) {
        let url = 'p?id=task-form&taskId=' + (taskId !== 'new' ? taskId : '');
        return this.http.get(url, { headers: HEADERS })
            .map(response => {
                let data = parseResponseObjects(response.json().objects);
                let task = <Task>data.task;
                if (!task.id) {
                    task.id = '';
                }
                if (data.fsid) {
                    task.fsid = data.fsid;
                }
                if (data.ACL) {
                    task.acl = data.ACL;
                }
                if (data.attachment) {
                    task.attachments = <Attachment[]>data.attachment.list;
                }
                return {
                    task: <Task>task,
                    actions: data.actions
                }
            });
    }

    saveTask(task: Task) {
        let url = 'p?id=task-form&taskId=' + (task.id ? task.id : '');
        return this.http.post(url, serializeObj(task), { headers: HEADERS })
            .map(response => transformPostResponse(response))
            .catch(error => Observable.throw(transformPostResponse(error)));
    }

    completeTask(task: Task) {
        return this.http.put('p?id=task-form&taskId=' + task.id + '&_action=complete&fsid=' + task.fsid, '', { headers: HEADERS })
            .map(response => transformPostResponse(response))
            .catch(error => Observable.throw(transformPostResponse(error)));
    }

    cancelTask(task: Task, comment: string) {
        return this.http.put('p?id=task-form&taskId=' + task.id + '&_action=cancel&fsid=' + task.fsid + '&comment=' + comment, '', { headers: HEADERS })
            .map(response => transformPostResponse(response))
            .catch(error => Observable.throw(transformPostResponse(error)));
    }

    acknowledgedTask(task: Task) {
        return this.http.put('p?id=task-form&taskId=' + task.id + '&_action=acknowledged&fsid=' + task.fsid, '', { headers: HEADERS })
            .map(response => transformPostResponse(response))
            .catch(error => Observable.throw(transformPostResponse(error)));
    }

    deleteTask(tasks: Task[]) {
        return this.http.delete('p?id=task-view&taskIds=' + tasks.map(it => it.id).join(','), { headers: HEADERS })
            .catch(error => Observable.throw(transformPostResponse(error)));
    }

    deleteTaskAttachment(task: Task, attachment: Attachment) {
        return this.http.delete('p?id=task-form&taskId=' + task.id + '&attachmentId=' + attachment.id + '&fsid=' + task.fsid, { headers: HEADERS })
            .catch(error => Observable.throw(transformPostResponse(error)));
    }


    //===================================
    //  REQUEST
    //-----------------------------------

    fetchTaskRequests(task: Task, page = 0) {
        return this.http.get('p?id=task-requests&taskId=' + task.id, { headers: HEADERS })
            .map(response => parseResponseObjects(response.json().objects).request || {})
            .map(data => {
                return {
                    requests: <Request[]>data.list,
                    meta: data.meta
                }
            });
    }

    fetchRequestById(requestId: string) {
        let url = 'p?id=task-requests&requestId=' + (requestId !== 'new' ? requestId : '');
        return this.http.get(url, { headers: HEADERS })
            .map(response => {
                let data = parseResponseObjects(response.json().objects);
                let request = <Request>data.request;
                if (data.fsid) {
                    request.fsid = data.fsid;
                }
                if (data.attachment) {
                    request.attachments = <Attachment[]>data.attachment.list;
                }
                return {
                    request: <Request>request,
                    actions: data.actions
                }
            });
    }

    sendTaskRequest(request: Request) {
        let url = 'p?id=task-requests&taskId=' + request.taskId;
        return this.http.post(url, serializeObj(request), { headers: HEADERS })
            .map(response => transformPostResponse(response))
            .catch(error => Observable.throw(transformPostResponse(error)));
    }

    doAcceptRequest(request: Request, data?: any) {
        let url = 'p?id=task-requests&requestId=' + request.id + '&_action=accept&fsid=' + request.fsid + '&' + serializeObj(data);
        return this.http.put(url, '', { headers: HEADERS })
            .map(response => transformPostResponse(response))
            .catch(error => Observable.throw(transformPostResponse(error)));
    }

    doDeclineRequest(request: Request, comment: string) {
        let url = 'p?id=task-requests&requestId=' + request.id + '&comment=' + comment + '&_action=decline&fsid=' + request.fsid;
        return this.http.put(url, '', { headers: HEADERS })
            .map(response => transformPostResponse(response))
            .catch(error => Observable.throw(transformPostResponse(error)));
    }

    deleteRequest(request: Request) {
        return this.http.delete('p?id=task-requests&requestId=' + request.id, { headers: HEADERS })
            .catch(error => Observable.throw(transformPostResponse(error)));
    }

    deleteRequestAttachment(request: Request, attachment: Attachment) {
        return this.http.delete('p?id=task-requests&requestId=' + request.id + '&attachmentId=' + attachment.id + '&fsid=' + request.fsid, { headers: HEADERS })
            .catch(error => Observable.throw(transformPostResponse(error)));
    }


    //===================================
    //  COMMENT
    //-----------------------------------

    fetchComments(task: Task, page = 0) {
        return this.http.get('p?id=comments&taskId=' + task.id, { headers: HEADERS })
            .map(response => parseResponseObjects(response.json().objects).comment || {})
            .map(data => {
                return {
                    comments: <Comment[]>data.list,
                    meta: data.meta
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
        return this.http.delete('p?id=comments&commentId=' + comment.id, { headers: HEADERS })
            .catch(error => Observable.throw(transformPostResponse(error)));
    }

    deleteCommentAttachment(comment: Comment, attachment: Attachment) {
        return this.http.delete('p?id=comments&commentId=' + comment.id + '&attachmentId=' + attachment.id + '&fsid=' + comment.fsid, { headers: HEADERS })
            .catch(error => Observable.throw(transformPostResponse(error)));
    }
}
