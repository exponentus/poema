import { ApprovalStatusType, ApprovalSchemaType, ApprovalResultType } from './constants';
import { Block } from './block';

export class Approval {
    readonly status: ApprovalStatusType = 'DRAFT';
    readonly schema: ApprovalSchemaType = 'UNKNOWN';
    readonly result: ApprovalResultType = 'UNKNOWN';
    readonly version: number;
    blocks: Block[];

    static convertToDto(m: Approval): any {
        return {
            blocks: Block.convertToDtoList(m.blocks)
        };
    }
}
