import { IEntity, Attachment } from '@nb/core';
import { DATE_TIME_FORMAT } from '@nb/core';
import { mdFormat } from '@nb/core';
import { BaseModel } from './base-model';

export class Project extends BaseModel {
    name: string;
    status: string = 'DRAFT';
    customer: IEntity;
    representatives: IEntity[];
    representativesUserIds: string[];
    manager: IEntity;
    managerUserId: string;
    programmer: IEntity;
    programmerUserId: string;
    tester: IEntity;
    testerUserId: string;
    observers: IEntity[];
    observerUserIds: string[];
    comment: string;
    finishDate: Date;
    attachments: Attachment[];
    hasAttachments: boolean;

    static convertToDto(m: Project): any {
        return {
            id: m.id || null,
            name: m.name || '',
            status: m.status || null,
            customer: m.customer ? { id: m.customer.id } : null,
            representativesUserIds: m.representatives ? m.representatives.map(it => it.userID) : [],
            managerUserId: m.manager ? m.manager.userID : null,
            programmerUserId: m.programmer ? m.programmer.userID : null,
            testerUserId: m.tester ? m.tester.userID : null,
            observerUserIds: m.observers ? m.observers.map(it => it.userID) : [],
            comment: m.comment ? m.comment : '',
            finishDate: mdFormat(m.finishDate, DATE_TIME_FORMAT),
            attachments: Attachment.convertToDtoList(m.attachments)
        };
    }
}
