import { Injectable } from '@angular/core';

import { DataService } from '../../../services';
import { Incoming } from '../models';
import { API_URL } from '../workflow.routing';

@Injectable()
export class WorkflowIncomingService {

    constructor(
        private dataService: DataService
    ) { }

    fetchIncomings(params = {}) {
        return this.dataService.apiGet(`${API_URL}/incomings`, params);
    }

    fetchIncomingById(id: string) {
        return this.dataService.get(`${API_URL}/incomings/${id}`);
    }

    saveIncoming(incoming: Incoming, params = {}) {
        if (incoming.id) {
            return this.updateIncoming(incoming, params);
        } else {
            return this.addIncoming(incoming, params);
        }
    }

    private addIncoming(incoming: Incoming, params = {}) {
        return this.dataService.post(`${API_URL}/incomings`, params, incoming);
    }

    private updateIncoming(incoming: Incoming, params = {}) {
        return this.dataService.put(`${API_URL}/incomings/${incoming.id}`, params, incoming);
    }

    deleteIncoming(incoming: Incoming) {
        return this.dataService.delete(`${API_URL}/incomings/${incoming.id}`);
    }

    doIncomingAction(id: string, actionId: string) {
        let incoming = {
            summary: 'hello world'
        };
        return this.dataService.apiPut(`${API_URL}/incomings/${id}/${actionId}`, null, incoming);
    }

    doIncomingListAction(ids: string[], actionId: string) {
        return this.dataService.put(`${API_URL}/incomings/${actionId}`, { ids }, {});
    }
}
