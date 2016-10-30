import { BaseModel } from '../../../models';
import { Approver } from './approver';

export class Block extends BaseModel {
    status: string; // ApprovalStatusType
    approvers: Approver[];
    type: string; // ApprovalType
    requireCommentIfNo: boolean;
    timeLimit: number;
}
