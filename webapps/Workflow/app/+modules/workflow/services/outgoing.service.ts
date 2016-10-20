import { Injectable } from '@angular/core';

import { DataService } from '../../../services';
import { Attachment } from '../../../models';
import { Outgoing } from '../models';
import { API_URL } from '../workflow.routing';

@Injectable()
export class WorkflowOutgoingService {

    constructor(
        private dataService: DataService
    ) { }

    fetchOutgoings(params = {}) {
        return this.dataService.apiGet(`${API_URL}/outgoings`, params);
    }

    fetchOutgoingById(id: string, params = {}) {
        return this.dataService.get(`${API_URL}/outgoings/${id}`, params);
    }

    saveOutgoing(outgoing: Outgoing, params = {}) {
        return this.dataService.post(`${API_URL}/outgoings/${outgoing.id}`, params, outgoing);
    }

    deleteOutgoing(outgoing: Outgoing) {
        return this.dataService.delete(`${API_URL}/outgoings/${outgoing.id}`);
    }

    doOutgoingAction(id: string, actionId: string) {
        let outgoing = {
            title: 'hello world'
        };
        return this.dataService.apiPut(`${API_URL}/outgoings/${id}/${actionId}`, null, outgoing);
    }

    doOutgoingsAction(ids: string[], actionId: string) {
        return this.dataService.put(`${API_URL}/outgoings/${actionId}`, { ids }, {});
    }
}
