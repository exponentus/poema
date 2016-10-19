import { Injectable } from '@angular/core';

import { DataService } from '../../../services';
import { Attachment } from '../../../models';
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
        return this.dataService.apiPost(`${API_URL}/incomings/${incoming.id}`, params, { incoming: incoming });
    }

    deleteIncoming(incoming: Incoming) {
        return this.dataService.delete(`${API_URL}/incomings/${incoming.id}`);
    }

    deleteIncomingAttachment(incoming: Incoming, attachment: Attachment, params = {}) {
        let url = `${API_URL}/incomings/${incoming.id}/attachments/${attachment.id}`;
        return this.dataService.delete(url, params);
    }

    doIncomingAction(id: string, actionId: string) {
        let incoming = {
            title: 'hello world'
        };
        return this.dataService.apiPut(`${API_URL}/incomings/${id}/${actionId}`, null, incoming);
    }

    doIncomingsAction(ids: string[], actionId: string) {
        return this.dataService.put(`${API_URL}/incomings/${actionId}`, { ids }, {});
    }
}
