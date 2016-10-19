import { Injectable } from '@angular/core';

import { DataService } from '../../../services';
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

    fetchOfficeMemoById(id: string) {
        return this.dataService.get(`${API_URL}/office-memos/${id}`);
    }

    saveOfficeMemo(officeMemo: OfficeMemo, params = {}) {
        return this.dataService.post(`${API_URL}/office-memos/${officeMemo.id}`, params, officeMemo);
    }

    deleteOfficeMemo(officeMemo: OfficeMemo) {
        return this.dataService.delete(`${API_URL}/office-memos/${officeMemo.id}`);
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
