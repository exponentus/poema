import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { AppService, DataService } from '../../../services';
import { Outgoing } from '../models';
import { xhrHeaders, createURLSearchParams, parseResponseObjects, serializeObj, transformPostResponse } from '../../../utils/utils';

@Injectable()
export class WorkflowOutgoingService {

    constructor(
        private http: Http,
        private appService: AppService,
        private dataService: DataService
    ) { }

    fetch(params: any, retry = 1) {
        return this.dataService.get('/Workflow/p', params, retry);
    }

    fetchOutgoings(queryParams = {}) {
        return this.http.get('/Workflow/p?id=outgoing-view', {
            headers: xhrHeaders(),
            search: createURLSearchParams(queryParams)
        })
            .map(response => {
                let data = parseResponseObjects(response.json().objects);
                return data;
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

    doAction(actionId: string) {
        return this.http.put('/Workflow/p?id=incoming-view&_action=' + actionId, '', { headers: xhrHeaders() })
            .map(response => transformPostResponse(response))
            .catch(error => this.appService.handleError(error));
    }
}
