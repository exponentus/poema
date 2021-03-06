import { DATE_TIME_FORMAT } from '@nb/core';
import { mdFormat } from '@nb/core';
import { Approver } from './approver';

export class Block {
    id: string;
    tid: string;
    deleted: boolean = false;
    isNew: boolean = true;
    //
    status: string = 'DRAFT';
    type: string = 'SERIAL';
    requireCommentIfNo: boolean = false;
    timeLimit: number = 0;
    sort: number;
    approvers: Approver[] = [];

    static convertToDto(m: Block): any {
        return {
            id: m.id || null,
            status: m.status || 'UNKNOWN',
            type: m.type || 'UNKNOWN',
            requireCommentIfNo: m.requireCommentIfNo,
            timeLimit: m.timeLimit || 0,
            sort: m.sort,
            approvers: Approver.convertToDtoList(m.approvers),
        };
    }

    static convertToDtoList(list: Block[]): any {
        let result = [];
        if (list) {
            list.forEach((it, index) => {
                it.sort = index + 1;
                result.push(Block.convertToDto(it));
            });
        }
        return result;
    }
}
