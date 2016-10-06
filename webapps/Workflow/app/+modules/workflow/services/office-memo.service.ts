import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { AppService } from '../../../services';
import { OfficeMemo } from '../models';
import { xhrHeaders, createURLSearchParams, parseResponseObjects, serializeObj, transformPostResponse } from '../../../utils/utils';

@Injectable()
export class WorkflowOfficeMemoService {

    constructor(
        private http: Http,
        private appService: AppService
    ) { }

    fetchOfficeMemos(queryParams = {}) {
        return this.http.get('/Workflow/p?id=officememo-view', {
            headers: xhrHeaders(),
            search: createURLSearchParams(queryParams)
        })
            .map(response => {
                let data = parseResponseObjects(response.json().objects);
                return data;
            })
            .catch(error => this.appService.handleError(error));
    }

    fetchOfficeMemoById(id: string) {
        let url = '/Workflow/p?id=officememo-form&docid=' + (id !== 'new' ? id : '');

        return this.http.get(url, { headers: xhrHeaders() })
            .map(response => {
                let data = parseResponseObjects(response.json().objects);
                let officememo = <any>data.officememo;
                if (!officememo.id) {
                    officememo.id = '';
                }
                if (data.fsid) {
                    officememo.fsid = data.fsid;
                }
                if (data.ACL) {
                    officememo.acl = data.ACL;
                }
                if (data.attachment) {
                    officememo.attachments = data.attachment.list;
                }
                return {
                    officememo: <OfficeMemo>officememo,
                    actions: data.actions
                }
            })
            .catch(error => this.appService.handleError(error));
    }
}
