import { BaseModel } from '../../../models';
import { Approval } from './approval';

export class OfficeMemo extends BaseModel {
    regNumber: string;
    appliedRegDate: Date;
    approval: Approval;
    summary: string;
    content: string;
    attachments: any; // Attachment[]
}
