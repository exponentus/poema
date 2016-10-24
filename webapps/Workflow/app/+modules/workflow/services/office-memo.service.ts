import { Injectable } from '@angular/core';

import { DataService } from '../../../services';
import { Attachment } from '../../../models';
import { OfficeMemo } from '../models';
import { API_URL } from '../workflow.routing';

@Injectable()
export class WorkflowOfficeMemoService {

    constructor(
        private dataService: DataService
    ) { }

    fetchOfficeMemos(params = {}) {
        return this.dataService.apiGet(`${API_URL}/office-memos`, params);
    }

    fetchOfficeMemoById(id: string, params = {}) {
        return this.dataService.apiGet(`${API_URL}/office-memos/${id}`, params);
    }

    saveOfficeMemo(officeMemo: OfficeMemo, params = {}) {
        let url = `${API_URL}/office-memos/${officeMemo.id ? officeMemo.id : 'new'}`;
        let payload = Object.assign(officeMemo, {
            approval: officeMemo.approval ? officeMemo.approval.id : null
        });
        return this.dataService.apiPost(url, params, { officeMemo: payload });
    }

    deleteOfficeMemo(officeMemo: OfficeMemo) {
        return this.dataService.delete(`${API_URL}/office-memos/${officeMemo.id}`);
    }

    deleteOfficeMemoAttachment(officeMemo: OfficeMemo, attachment: Attachment, params = {}) {
        let url = `${API_URL}/office-memos/${officeMemo.id}/attachments/${attachment.id}`;
        return this.dataService.delete(url, params);
    }

    doOfficeMemoAction(id: string, actionId: string) {
        let officeMemo = {
            title: 'hello world'
        };
        return this.dataService.apiPut(`${API_URL}/office-memos/${id}/${actionId}`, null, officeMemo);
    }

    doOfficeMemosAction(ids: string[], actionId: string) {
        return this.dataService.put(`${API_URL}/office-memos/${actionId}`, { ids }, {});
    }
}
