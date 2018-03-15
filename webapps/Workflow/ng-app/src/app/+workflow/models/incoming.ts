import { DATE_TIME_FORMAT } from '@nb/core';
import { Attachment, Observer } from '@nb/core';
import { mdFormat } from '@nb/core';
import { BaseModel } from './base-model';
import { Employee, Outgoing } from './index';

export class Incoming extends BaseModel {
    regNumber: string;
    appliedRegDate: Date;
    sender: any;
    addressee: Employee;
    senderRegNumber: string;
    senderAppliedRegDate: Date;
    title: string;
    body: string;
    docLanguage: any; // DocumentLanguage;
    docType: any; // DocumentType;
    docSubject: any; // DocSubject
    responseTo: Outgoing;
    attachments: Attachment[];
    tags: any[];
    observers: Observer[];

    static convertToDto(m: Incoming): any {
        return {
            id: m.id || null,
            authorId: m.authorId,
            regNumber: m.regNumber || '',
            appliedRegDate: mdFormat(m.appliedRegDate, DATE_TIME_FORMAT),
            sender: m.sender ? { id: m.sender.id } : null,
            addressee: m.addressee ? { id: m.addressee.id } : null,
            senderRegNumber: m.senderRegNumber || '',
            senderAppliedRegDate: mdFormat(m.senderAppliedRegDate, DATE_TIME_FORMAT),
            title: m.title || '',
            body: m.body || '',
            docLanguage: m.docLanguage ? { id: m.docLanguage.id } : null,
            docType: m.docType ? { id: m.docType.id } : null,
            docSubject: m.docSubject ? { id: m.docSubject.id } : null,
            responseTo: m.responseTo ? { id: m.responseTo.id } : null,
            attachments: Attachment.convertToDtoList(m.attachments),
            tags: m.tags ? m.tags.map(it => { return { id: it.id }; }) : null,
            observers: Observer.convertToDtoList(m.observers)
        };
    }
}
