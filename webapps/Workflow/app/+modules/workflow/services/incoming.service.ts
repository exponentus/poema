import { Injectable } from '@angular/core';

import { DataService } from '../../../services';
import { Attachment } from '../../../models';
import { Incoming } from '../models';
import { API_URL } from '../workflow.routing';
import { DATE_TIME_FORMAT } from '../../../constants/constants';
import { mdFormat } from '../../../utils/time.utils';

@Injectable()
export class WorkflowIncomingService {

    constructor(
        private dataService: DataService
    ) { }

    fetchIncomings(params = {}) {
        return this.dataService.apiGet(`${API_URL}/incomings`, params);
    }

    fetchIncomingById(id: string, params = {}) {
        return this.dataService.apiGet(`${API_URL}/incomings/${id}`, params);
    }

    saveIncoming(incoming: Incoming, params = {}) {
        let url = `${API_URL}/incomings/${incoming.id ? incoming.id : 'new'}`;
        let payload = Object.assign({}, incoming, {
            appliedRegDate: mdFormat(incoming.appliedRegDate, DATE_TIME_FORMAT),
            senderAppliedRegDate: mdFormat(incoming.senderAppliedRegDate, DATE_TIME_FORMAT),
            sender: incoming.sender ? incoming.sender.id : null,
            docLanguage: incoming.docLanguage ? incoming.docLanguage.id : null,
            docType: incoming.docType ? incoming.docType.id : null,
            responseTo: incoming.responseTo ? incoming.responseTo.id : null
        });
        return this.dataService.apiPost(url, params, { incoming: payload });
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
