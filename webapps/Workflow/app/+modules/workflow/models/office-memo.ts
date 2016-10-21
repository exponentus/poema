import { Approval } from './approval';

export class OfficeMemo {
    id: string = '';
    regNumber: string;
    appliedRegDate: Date;
    approval: Approval;
    summary: string;
    content: string;
    attachments: any; // Attachment[]
}
