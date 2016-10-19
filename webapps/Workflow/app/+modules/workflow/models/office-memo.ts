import { Approval } from './approval';

export class OfficeMemo {
    id: string = '';
    regNumber: string;
    appliedRegDate: Date;
    approval: Approval;
    title: string;
    content: string;
    attachments: any; // Attachment[]
}
