import { Approval } from './approval';

export class OfficeMemo {
    id: string = '';
    isNew: boolean = true;
    editable: boolean = false;
    children: any[];

    regNumber: string;
    appliedRegDate: Date;
    approval: Approval;
    summary: string;
    content: string;
    attachments: any; // Attachment[]
}
