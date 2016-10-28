import { BaseModel } from '../../../models';
import { Block } from './block';

export class Approver extends BaseModel {
    approverUser: number;
    type: string; // DecisionType
    decisionTime: Date;
    decisionComment: string;
    block: Block;
    isCurrent: boolean;
}
