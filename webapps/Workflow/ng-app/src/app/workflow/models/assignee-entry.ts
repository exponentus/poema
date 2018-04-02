import { DATE_TIME_FORMAT } from '@nb/core';
import { mdFormat } from '@nb/core';
import { ControlStatusType } from './constants';
import { Employee } from '../models';

export class AssigneeEntry {
    id: string;
    tid: string;
    isNew: boolean = true;
    status: ControlStatusType = 'DRAFT';
    coordinator: boolean;
    assignee: Employee;
    resetTime: Date;
    resetBy: Employee;
    resetInfo: string;
    sort: number;

    constructor() {
        this.isNew = true;
    }

    static convertToDto(m: AssigneeEntry): any {
        return {
            // id: m.id || null,
            coordinator: m.coordinator,
            assignee: m.assignee ? { id: m.assignee.id } : null,
            resetTime: mdFormat(m.resetTime, DATE_TIME_FORMAT),
            resetBy: m.resetBy ? { id: m.resetBy.id } : null,
            resetInfo: m.resetInfo,
            sort: m.sort
        };
    }

    static convertToDtoList(list: AssigneeEntry[]): any {
        let result = [];
        if (list) {
            list.forEach(it => {
                result.push(AssigneeEntry.convertToDto(it));
            });
        }
        return result;
    }
}
