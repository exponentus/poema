import { IDtoConverter } from '@nb/core';
import { DATE_TIME_FORMAT } from '@nb/core';
import { mdFormat } from '@nb/core';

import { ApproverDecisionType } from './constants';
import { Block } from './block';
import { Employee } from '../models';

export class Approver {
    id: string;
    tid: string = Date.now().toString();
    deleted: boolean = false;
    isNew: boolean = true;
    //
    employee: Employee;
    decisionType: ApproverDecisionType = 'UNKNOWN';
    decisionTime: Date;
    decisionComment: string;
    current: boolean;
    sort: number;
    blocks: Block[];

    static convertToDto(m: Approver): any {
        return {
            id: m.id || null,
            employee: { id: m.employee.id },
            decisionType: m.decisionType || 'UNKNOWN',
            decisionTime: mdFormat(m.decisionTime, DATE_TIME_FORMAT),
            decisionComment: m.decisionComment || '',
            current: m.current || false,
            sort: m.sort
        };
    }

    static convertToDtoList(list: Approver[]): any {
        let result = [];
        if (list) {
            list.forEach((it, index) => {
                it.sort = index;
                result.push(Approver.convertToDto(it));
            });
        }
        return result;
    }
}
