import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { AppService } from '../../../services';
import { Outgoing } from '../models';
import { xhrHeaders, createURLSearchParams, parseResponseObjects, serializeObj, transformPostResponse } from '../../../utils/utils';

@Injectable()
export class WorkflowOutgoingService {

    constructor(
        private http: Http,
        private appService: AppService
    ) { }

    fetchOutgoings(queryParams = {}) {
        return this.http.get('/Workflow/p?id=outgoing-view', {
            headers: xhrHeaders(),
            search: createURLSearchParams(queryParams)
        })
            .map(response => response.json().objects[1])
            .map(data => {
                return {
                    list: <Outgoing[]>data.list,
                    meta: data.meta
                };
            })
            .catch(error => this.appService.handleError(error));
    }

    fetchOutgoingById(id: string) {
        let url = '/Workflow/p?id=outgoing-form&docid=' + (id !== 'new' ? id : '');

        return this.http.get(url, { headers: xhrHeaders() })
            .map(response => {
                let data = parseResponseObjects(response.json().objects);
                let outgoing = <any>data.outgoing;
                if (!outgoing.id) {
                    outgoing.id = '';
                }
                if (data.fsid) {
                    outgoing.fsid = data.fsid;
                }
                if (data.ACL) {
                    outgoing.acl = data.ACL;
                }
                if (data.attachment) {
                    outgoing.attachments = data.attachment.list;
                }
                return {
                    outgoing: <Outgoing>outgoing,
                    actions: data.actions
                }
            })
            .catch(error => this.appService.handleError(error));
    }
}
