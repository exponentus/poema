import { BaseModel } from './base-model';
import { Block } from './block';

export class Approval extends BaseModel {
    status: string = 'DRAFT';
    schema: string;
    result: string;
    version: number;
    blocks: Block[];

    static convertToDto(m: Approval): any {
        return {
            blocks: Block.convertToDtoList(m.blocks)
        };
    }
}
