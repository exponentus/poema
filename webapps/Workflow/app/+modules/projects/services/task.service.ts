import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { AppService } from '../../../services';
import { Attachment } from '../../../models/attachment';
import { Task, Request, Comment } from '../models';
import { xhrHeaders, createURLSearchParams, parseResponseObjects, serializeObj, transformPostResponse } from '../../../utils/utils';

@Injectable()
export class TaskService {

    constructor(
        private http: Http,
        private translate: TranslateService,
        private appService: AppService
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
        return this.http.get('/Projects/p?id=task-view', {
            headers: xhrHeaders(),
            search: createURLSearchParams(queryParams)
        })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    tasks: <Task[]>data.list,
                    meta: data.meta
                }
            })
            .catch(error => this.appService.handleError(error));
    }

    fetchTaskById(taskId: string, params: any = {}) {
        let url = '/Projects/p?id=task-form&taskId=' + (taskId !== 'new' ? taskId : '');
        return this.http.get(url, { headers: xhrHeaders(), search: createURLSearchParams(params) })
            .map(response => {
                let json = response.json();
                let data = parseResponseObjects(json.objects);
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
                let parentTask;
                if (json.data) {
                    parentTask = json.data.parentTask;
                }
                return {
                    task: <Task>task,
                    parentTask: <Task>parentTask,
                    actions: data.actions
                }
            })
            .catch(error => this.appService.handleError(error));
    }

    saveTask(task: Task) {
        let url = '/Projects/p?id=task-form&taskId=' + (task.id ? task.id : '');
        return this.http.post(url, serializeObj(task), { headers: xhrHeaders() })
            .map(response => transformPostResponse(response))
            .catch(error => this.appService.handleError(error));
    }

    completeTask(task: Task) {
        return this.http.put('/Projects/p?id=task-form&taskId=' + task.id + '&_action=complete&fsid=' + task.fsid, '', { headers: xhrHeaders() })
            .map(response => transformPostResponse(response))
            .catch(error => this.appService.handleError(error));
    }

    cancelTask(task: Task, comment: string) {
        return this.http.put('/Projects/p?id=task-form&taskId=' + task.id + '&_action=cancel&fsid=' + task.fsid + '&comment=' + comment, '', { headers: xhrHeaders() })
            .map(response => transformPostResponse(response))
            .catch(error => this.appService.handleError(error));
    }

    acknowledgedTask(task: Task) {
        return this.http.put('/Projects/p?id=task-form&taskId=' + task.id + '&_action=acknowledged&fsid=' + task.fsid, '', { headers: xhrHeaders() })
            .map(response => transformPostResponse(response))
            .catch(error => this.appService.handleError(error));
    }

    deleteTask(tasks: Task[]) {
        return this.http.delete('/Projects/p?id=task-view&taskIds=' + tasks.map(it => it.id).join(','), { headers: xhrHeaders() })
            .catch(error => this.appService.handleError(error));
    }

    deleteTaskAttachment(task: Task, attachment: Attachment) {
        return this.http.delete('/Projects/p?id=task-form&taskId=' + task.id + '&attachmentId=' + attachment.id + '&fsid=' + task.fsid, { headers: xhrHeaders() })
            .catch(error => this.appService.handleError(error));
    }


    //===================================
    //  REQUEST
    //-----------------------------------

    fetchTaskRequests(task: Task, page = 0) {
        return this.http.get('/Projects/p?id=task-requests&taskId=' + task.id, { headers: xhrHeaders() })
            .map(response => parseResponseObjects(response.json().objects).request || {})
            .map(data => {
                return {
                    requests: <Request[]>data.list,
                    meta: data.meta
                }
            })
            .catch(error => this.appService.handleError(error));
    }

    fetchRequestById(requestId: string) {
        let url = '/Projects/p?id=task-requests&requestId=' + (requestId !== 'new' ? requestId : '');
        return this.http.get(url, { headers: xhrHeaders() })
            .map(response => {
                let data = parseResponseObjects(response.json().objects);
                let request = <Request>data.request;
                if (data.fsid) {
                    request.fsid = data.fsid;
                }
                if (data.ACL) {
                    request.acl = data.ACL;
                }
                if (data.attachment) {
                    request.attachments = <Attachment[]>data.attachment.list;
                }
                return {
                    request: <Request>request,
                    actions: data.actions
                }
            })
            .catch(error => this.appService.handleError(error));
    }

    sendTaskRequest(request: Request) {
        let url = '/Projects/p?id=task-requests&taskId=' + request.taskId;
        return this.http.post(url, serializeObj(request), { headers: xhrHeaders() })
            .map(response => transformPostResponse(response))
            .catch(error => this.appService.handleError(error));
    }

    doAcceptRequest(request: Request, data?: any) {
        let url = '/Projects/p?id=task-requests&requestId=' + request.id + '&_action=accept&fsid=' + request.fsid + '&' + serializeObj(data);
        return this.http.put(url, '', { headers: xhrHeaders() })
            .map(response => transformPostResponse(response))
            .catch(error => this.appService.handleError(error));
    }

    doDeclineRequest(request: Request, comment: string) {
        let url = '/Projects/p?id=task-requests&requestId=' + request.id + '&comment=' + comment + '&_action=decline&fsid=' + request.fsid;
        return this.http.put(url, '', { headers: xhrHeaders() })
            .map(response => transformPostResponse(response))
            .catch(error => this.appService.handleError(error));
    }

    deleteRequest(request: Request) {
        return this.http.delete('/Projects/p?id=task-requests&requestId=' + request.id, { headers: xhrHeaders() })
            .catch(error => this.appService.handleError(error));
    }

    deleteRequestAttachment(request: Request, attachment: Attachment) {
        return this.http.delete('/Projects/p?id=task-requests&requestId=' + request.id + '&attachmentId=' + attachment.id + '&fsid=' + request.fsid, { headers: xhrHeaders() })
            .catch(error => this.appService.handleError(error));
    }


    //===================================
    //  COMMENT
    //-----------------------------------

    fetchComments(task: Task, page = 0) {
        return this.http.get('/Projects/p?id=comments&taskId=' + task.id, { headers: xhrHeaders() })
            .map(response => parseResponseObjects(response.json().objects).comment || {})
            .map(data => {
                return {
                    comments: <Comment[]>data.list,
                    meta: data.meta
                }
            })
            .catch(error => this.appService.handleError(error));
    }

    saveComment(task: Task, comment: Comment) {
        let url = '/Projects/p?id=comments&taskId=' + task.id + (comment.id ? '&commentId=' + comment.id : '');
        return this.http.post(url, serializeObj(comment), { headers: xhrHeaders() })
            .map(response => transformPostResponse(response))
            .catch(error => this.appService.handleError(error));
    }

    deleteComment(comment: Comment) {
        return this.http.delete('/Projects/p?id=comments&commentId=' + comment.id, { headers: xhrHeaders() })
            .catch(error => this.appService.handleError(error));
    }

    deleteCommentAttachment(comment: Comment, attachment: Attachment) {
        return this.http.delete('/Projects/p?id=comments&commentId=' + comment.id + '&attachmentId=' + attachment.id + '&fsid=' + comment.fsid, { headers: xhrHeaders() })
            .catch(error => this.appService.handleError(error));
    }
}
