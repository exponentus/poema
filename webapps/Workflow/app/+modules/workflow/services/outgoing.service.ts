import { Injectable } from '@angular/core';

import { DataService } from '../../../services';
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

    fetchOutgoingById(id: string) {
        return this.dataService.get(`${API_URL}/outgoings/${id}`);
    }

    saveOutgoing(outgoing: Outgoing, params = {}) {
        if (outgoing.id) {
            return this.updateOutgoing(outgoing, params);
        } else {
            return this.addOutgoing(outgoing, params);
        }
    }

    private addOutgoing(outgoing: Outgoing, params = {}) {
        return this.dataService.post(`${API_URL}/outgoings`, params, outgoing);
    }

    private updateOutgoing(outgoing: Outgoing, params = {}) {
        return this.dataService.put(`${API_URL}/outgoings/${outgoing.id}`, params, outgoing);
    }

    deleteOutgoing(outgoing: Outgoing) {
        return this.dataService.delete(`${API_URL}/outgoings/${outgoing.id}`);
    }

    doOutgoingAction(id: string, actionId: string) {
        let outgoing = {
            summary: 'hello world'
        };
        return this.dataService.apiPut(`${API_URL}/outgoings/${id}/${actionId}`, null, outgoing);
    }

    doOutgoingListAction(ids: string[], actionId: string) {
        return this.dataService.put(`${API_URL}/outgoings/${actionId}`, { ids }, {});
    }
}
