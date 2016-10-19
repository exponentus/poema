import { Approver } from './approver';

export class Block {
    id: string = '';
    status: string; // ApprovalStatusType
    approvers: Approver[];
    type: string; // ApprovalType
    requireCommentIfNo: boolean;
    timeLimit: number;
}
