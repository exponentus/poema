import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ApprovalStatusType } from '../models/constants';

@Injectable()
export class ValueObjectService {

    APPROVAL_STATUS_TYPES: { id: ApprovalStatusType, name: string, _itemClass: string }[];

    constructor(
        private translate: TranslateService
    ) {
        this.init();
    }

    init() {
        this.fetchApprovalStatusTypes();
    }

    private fetchApprovalStatusTypes() {
        this.translate.get(['draft', 'pending', 'finished', 'awaiting', 'rejected', 'registered']).map(t => [
            { id: 'DRAFT' as ApprovalStatusType, name: t.draft, _itemClass: 'status-draft' },
            { id: 'PENDING' as ApprovalStatusType, name: t.pending, _itemClass: 'status-pending' },
            { id: 'FINISHED' as ApprovalStatusType, name: t.finished, _itemClass: 'status-finished' },
            { id: 'AWAITING' as ApprovalStatusType, name: t.awaiting, _itemClass: 'status-awaiting' },
            { id: 'REJECTED' as ApprovalStatusType, name: t.rejected, _itemClass: 'status-rejected' },
            { id: 'REGISTERED' as ApprovalStatusType, name: t.registered, _itemClass: 'status-registered' }
        ]).subscribe(it => this.APPROVAL_STATUS_TYPES = it);
    }
}
