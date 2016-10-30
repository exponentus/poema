import { Injectable } from '@angular/core';

import { DataService } from '../../../services';
import { Attachment } from '../../../models';
import { Outgoing } from '../models';
import { API_URL } from '../constants/constants';
import { DATE_TIME_FORMAT } from '../../../constants/constants';
import { mdFormat } from '../../../utils/time.utils';

@Injectable()
export class WorkflowOutgoingService {

    constructor(
        private dataService: DataService
    ) { }

    fetchOutgoings(params = {}) {
        return this.dataService.apiGet(`${API_URL}outgoings`, params);
    }

    fetchOutgoingById(id: string, params = {}) {
        return this.dataService.apiGet(`${API_URL}outgoings/${id}`, params);
    }

    saveOutgoing(outgoing: Outgoing, params = {}) {
        let url = `${API_URL}outgoings/${outgoing.id ? outgoing.id : 'new'}`;
        let payload = Object.assign({}, outgoing, {
            appliedRegDate: mdFormat(outgoing.appliedRegDate, DATE_TIME_FORMAT),
            recipient: outgoing.recipient ? outgoing.recipient.id : null,
            docLanguage: outgoing.docLanguage ? outgoing.docLanguage.id : null,
            docType: outgoing.docType ? outgoing.docType.id : null
        });
        return this.dataService.apiPost(url, params, { outgoing: payload });
    }

    deleteOutgoing(outgoing: Outgoing) {
        return this.dataService.delete(`${API_URL}outgoings/${outgoing.id}`);
    }

    deleteOutgoingAttachment(outgoing: Outgoing, attachment: Attachment, params = {}) {
        let url = `${API_URL}outgoings/${outgoing.id}/attachments/${attachment.id}`;
        return this.dataService.delete(url, params);
    }

    doOutgoingAction(id: string, actionId: string) {
        let outgoing = {
            title: 'hello world'
        };
        return this.dataService.apiPut(`${API_URL}outgoings/${id}/${actionId}`, null, outgoing);
    }

    doOutgoingsAction(ids: string[], actionId: string) {
        return this.dataService.put(`${API_URL}outgoings/${actionId}`, { ids }, {});
    }
}
