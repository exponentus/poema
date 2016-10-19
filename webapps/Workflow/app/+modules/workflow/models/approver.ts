import { Block } from './block';

export class Approver {
    id: string = '';
    approverUser: number;
    type: string; // DecisionType
    decisionTime: Date;
    decisionComment: string;
    block: Block;
    isCurrent: boolean;
}
