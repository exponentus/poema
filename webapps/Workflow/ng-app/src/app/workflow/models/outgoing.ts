import { DATE_TIME_FORMAT } from '@nb/core';
import { Attachment, Observer } from '@nb/core';
import { mdFormat } from '@nb/core';
import { ApprovalStatusType, ApprovalSchemaType, ApprovalResultType } from './constants';
import { BaseModel } from './base-model';
import { Approval } from './approval';
import { Block } from './block';

export class Outgoing extends BaseModel {
    readonly status: ApprovalStatusType = 'DRAFT';
    readonly schema: ApprovalSchemaType = 'UNKNOWN';
    readonly result: ApprovalResultType = 'UNKNOWN';
    readonly version: number;
    blocks: Block[];
    //
    regNumber: string;
    appliedRegDate: Date;
    recipient: any;
    title: string;
    docSubject: any; // DocumentSubject
    docLanguage: any; // DocumentLanguage
    docType: any; // DocumentType
    body: string;
    attachments: Attachment[];
    tags: any[];
    observers: Observer[];

    static convertToDto(m: Outgoing): any {
        return {
            id: m.id || null,
            authorId: m.authorId,
            regNumber: m.regNumber,
            appliedRegDate: mdFormat(m.appliedRegDate, DATE_TIME_FORMAT),
            recipient: m.recipient ? { id: m.recipient.id } : null,
            title: m.title || '',
            docSubject: m.docSubject ? { id: m.docSubject.id } : null,
            docLanguage: m.docLanguage ? { id: m.docLanguage.id } : null,
            docType: m.docType ? { id: m.docType.id } : null,
            body: m.body || '',
            attachments: Attachment.convertToDtoList(m.attachments),
            tags: m.tags ? m.tags.map(it => { return { id: it.id }; }) : null,
            observers: Observer.convertToDtoList(m.observers),
            ...Approval.convertToDto(m),
            signature: m.signature
        };
    }

    static convertToSignData(m: Outgoing): any {
        let signData = {
            type: 'workflow.model.Outgoing',
            document: Outgoing.convertToDto(m),
            files: {}
        };
        if (m.attachments && m.attachments.length > 0) {
            m.attachments.filter(it => it.hash).forEach(it => {
                signData.files[it.realFileName] = it.hash;
            });
        }

        return signData;
    }
}
