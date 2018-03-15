import { DATE_TIME_FORMAT } from '@nb/core';
import { mdFormat } from '@nb/core';
import { ControlStatusType } from './constants';
import { AssigneeEntry } from './assignee-entry';

export class Control {
    controlType: any;
    startDate: Date;
    dueDate: Date;
    status: ControlStatusType = 'DRAFT';
    assigneeEntries: AssigneeEntry[];

    static convertToDto(m: Control): any {
        return {
            controlType: m.controlType ? { id: m.controlType.id } : null,
            startDate: mdFormat(m.startDate, DATE_TIME_FORMAT),
            dueDate: mdFormat(m.dueDate, DATE_TIME_FORMAT),
            status: m.status || 'UNKNOWN',
            assigneeEntries: AssigneeEntry.convertToDtoList(m.assigneeEntries)
        };
    }
}
