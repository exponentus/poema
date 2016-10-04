import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { AppService } from '../../../services/app.service';
import { Incoming } from '../models';
import { createURLSearchParams, parseResponseObjects, serializeObj, transformPostResponse } from '../../../utils/utils';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Injectable()
export class WorkflowIncomingService {

    constructor(
        private http: Http,
        private appService: AppService
    ) { }

    fetchIncomings(queryParams = {}) {
        return this.http.get('/Workflow/p?id=incoming-view', {
            headers: HEADERS,
            search: createURLSearchParams(queryParams)
        })
            .map(response => response.json().objects[1])
            .map(data => {
                return {
                    list: <Incoming[]>data.list,
                    meta: data.meta
                };
            })
            .catch(error => this.appService.handleError(error));
    }

    fetchIncomingById(id: string) {
        let url = '/Workflow/p?id=incoming-form&docid=' + (id !== 'new' ? id : '');

        return this.http.get(url, { headers: HEADERS })
            .map(response => {
                let data = parseResponseObjects(response.json().objects);
                let incoming = <any>data.incoming;
                if (!incoming.id) {
                    incoming.id = '';
                }
                if (data.fsid) {
                    incoming.fsid = data.fsid;
                }
                if (data.ACL) {
                    incoming.acl = data.ACL;
                }
                if (data.attachment) {
                    incoming.attachments = data.attachment.list;
                }
                return {
                    incoming: <Incoming>incoming,
                    actions: data.actions
                }
            })
            .catch(error => this.appService.handleError(error));
    }
}
