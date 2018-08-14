import { IEntity } from '@nb/core';
import { DATE_TIME_FORMAT } from '@nb/core';
import { Attachment, Observer } from '@nb/core';
import { mdFormat } from '@nb/core';

import { ControlStatusType } from './constants';
import { AssigneeEntry } from './assignee-entry';
import { BaseModel } from './base-model';
import { Employee } from './employee';

export class Assignment extends BaseModel {
    primary: IEntity;
    parent: Assignment;
    title: string;
    body: string;
    appliedAuthor: Employee;
    controlType: any;
    startDate: Date;
    dueDate: Date;
    status: ControlStatusType = 'DRAFT';
    statusTime: Date;
    assigneeEntries: AssigneeEntry[];
    observers: Observer[];
    tags: any[];
    attachments: Attachment[];

    constructor() {
        super();
    }

    static convertToDto(m: Assignment): any {
        return {
            id: m.id || null,
            authorId: m.authorId,
            title: m.title || '',
            body: m.body || '',
            appliedAuthor: m.appliedAuthor ? { id: m.appliedAuthor.id } : null,
            primary: m.primary ? { id: m.primary.id } : null,
            parent: m.parent ? { id: m.parent.id } : null,
            controlType: m.controlType ? { id: m.controlType.id } : null,
            startDate: mdFormat(m.startDate, DATE_TIME_FORMAT),
            dueDate: mdFormat(m.dueDate, DATE_TIME_FORMAT),
            status: m.status || 'UNKNOWN',
            assigneeEntries: AssigneeEntry.convertToDtoList(m.assigneeEntries),
            observers: Observer.convertToDtoList(m.observers),
            tags: m.tags ? m.tags.map(it => { return { id: it.id }; }) : null,
            attachments: Attachment.convertToDtoList(m.attachments)
        };
    }
}
