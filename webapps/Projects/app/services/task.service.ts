import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { Task } from '../models';
import { createURLSearchParams, serializeObj } from '../utils/utils';

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

    getTaskPriorityType() {
        return this.translate.get(['urgent', 'high', 'medium', 'normal']).map(t => [
            { value: 'NORMAL', text: t.normal, default: true },
            { value: 'MEDIUM', text: t.medium },
            { value: 'HIGH', text: t.high },
            { value: 'URGENT', text: t.urgent }
        ]);
    }

    getTaskStatusType() {
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
                    tasks: <Task[]>data.list,
                    meta: data.meta
                }
            });
    }

    fetchTaskById(taskId: string) {
        if (taskId === 'new') {
            return Observable.of(new Task());
        }

        return this.http.get('p?id=task-form&taskId=' + taskId, { headers: HEADERS })
            .map(response => <Task>response.json().objects[0]);
    }

    saveTask(task: Task) {
        let url = 'p?id=task-form' + (task.id ? '&taskId=' + task.id : '');
        return this.http.post(url, serializeObj(task), { headers: HEADERS })
            .map(response => this.transformPostResponse(response))
            .catch(error => Observable.throw(this.transformPostResponse(error)));
    }

    deleteTask(task: Task) {
        return this.http.delete('p?id=task-view&ids=' + task.id);
    }

    private transformPostResponse(response: Response) {
        let json = response.json();
        return Object.assign(json, {
            ok: json.type === 'DOCUMENT_SAVED',
            message: json.captions ? json.captions.type : json.message
        });
    }
}
