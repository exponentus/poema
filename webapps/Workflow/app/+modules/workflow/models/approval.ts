import { BaseModel } from '../../../models';
import { Block } from './block';

export class Approval extends BaseModel {
    status: string;
    blocks: Block[];
}
