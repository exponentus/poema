import { DATE_TIME_FORMAT } from '@nb/core';
import { Attachment, Observer } from '@nb/core';
import { mdFormat } from '@nb/core';
import { BaseModel } from './base-model';
import { Assignment } from './assignment';
import { Employee } from './employee';

export class Report extends BaseModel {
    title: string;
    body: string;
    appliedAuthor: Employee;
    appliedRegDate: Date;
    parent: Assignment;
    attachments: Attachment[];
    observers: Observer[];

    static convertToDto(m: Report): any {
        return {
            id: m.id || null,
            authorId: m.authorId,
            title: m.title || '',
            body: m.body || '',
            appliedAuthor: m.appliedAuthor ? { id: m.appliedAuthor.id } : null,
            appliedRegDate: mdFormat(m.appliedRegDate, DATE_TIME_FORMAT),
            parent: m.parent ? { id: m.parent.id } : null,
            attachments: Attachment.convertToDtoList(m.attachments),
            observers: Observer.convertToDtoList(m.observers)
        };
    }
}
