import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ApprovalType, ApprovalStatusType, ApprovalResultType, ControlStatusType } from '../models/constants';

@Injectable()
export class ValueObjectService {

    APPROVAL_TYPES: { id: ApprovalType, name: string }[];
    APPROVAL_STATUS_TYPES: { id: ApprovalStatusType, name: string }[];
    APPROVAL_RESULT_TYPES: { id: ApprovalResultType, name: string }[];
    CONTROL_STATUS_TYPES: { id: ControlStatusType, name: string }[];
    TIME_LIMITS: { id: number, name: string }[];

    constructor(
        private translate: TranslateService
    ) {
        this.init();
    }

    init() {
        this.fetchApprovalTypes();
        this.fetchApprovalStatusTypes();
        this.fetchControlStatusTypes();
        this.fetchApprovalResultTypes();
        this.fetchTimeLimits();
    }

    private fetchApprovalTypes() {
        this.translate.get(['serial', 'parallel', 'signing']).map(t => [
            { id: 'SERIAL' as ApprovalType, name: t.serial },
            { id: 'PARALLEL' as ApprovalType, name: t.parallel },
            { id: 'SIGNING' as ApprovalType, name: t.signing }
        ]).subscribe(it => this.APPROVAL_TYPES = it);
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

    private fetchApprovalResultTypes() {
        this.translate.get(['accepted', 'rejected', 'project']).map(t => [
            { id: 'ACCEPTED' as ApprovalResultType, name: t.accepted },
            { id: 'REJECTED' as ApprovalResultType, name: t.rejected },
            { id: 'PROJECT' as ApprovalResultType, name: t.project }
        ]).subscribe(it => this.APPROVAL_RESULT_TYPES = it);
    }

    private fetchControlStatusTypes() {
        this.translate.get(['draft', 'open', 'processing', 'pending', 'completed', 'cancelled']).map(t => [
            { id: 'DRAFT' as ControlStatusType, name: t.draft, _itemClass: 'status-draft' },
            { id: 'OPEN' as ControlStatusType, name: t.open, _itemClass: 'status-open' },
            { id: 'PROCESSING' as ControlStatusType, name: t.processing, _itemClass: 'status-processing' },
            { id: 'PENDING' as ControlStatusType, name: t.pending, _itemClass: 'status-pending' },
            { id: 'COMPLETED' as ControlStatusType, name: t.completed, _itemClass: 'status-completed' },
            { id: 'CANCELLED' as ControlStatusType, name: t.cancelled, _itemClass: 'status-cancelled' }
        ]).subscribe(it => this.CONTROL_STATUS_TYPES = it);
    }

    private fetchTimeLimits() {
        this.translate.get(['no', 'minutes', 'hour', 'hours', 'day', 'days', 'week']).map(t => [
            { id: 0, name: t.no },
            { id: 30, name: `30 ${t.minutes}` },
            { id: 60, name: `1 ${t.hour}` },
            { id: (60 * 3), name: `3 ${t.hours}` },
            { id: (60 * 6), name: `6 ${t.hours}` },
            { id: (60 * 24 * 1), name: `1 ${t.day}` },
            { id: (60 * 24 * 3), name: `3 ${t.days}` },
            { id: (60 * 24 * 7), name: `1 ${t.week}` }
        ]).subscribe(it => this.TIME_LIMITS = it);
    }
}
