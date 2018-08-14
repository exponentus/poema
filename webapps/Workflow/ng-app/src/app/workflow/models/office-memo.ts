import { DATE_TIME_FORMAT } from '@nb/core';
import { Attachment, Observer } from '@nb/core';
import { mdFormat } from '@nb/core';
import { ApprovalStatusType, ApprovalSchemaType, ApprovalResultType } from './constants';
import { BaseModel } from './base-model';
import { Approval } from './approval';
import { Employee } from './employee';
import { Block } from './block';

export class OfficeMemo extends BaseModel {
    readonly status: ApprovalStatusType = 'DRAFT';
    readonly schema: ApprovalSchemaType = 'UNKNOWN';
    readonly result: ApprovalResultType = 'UNKNOWN';
    readonly version: number;
    blocks: Block[];
    //
    regNumber: string;
    appliedAuthor: Employee;
    appliedRegDate: Date;
    title: string;
    body: string;
    recipient: Employee;
    attachments: Attachment[];
    observers: Observer[];

    static convertToDto(m: OfficeMemo): any {
        return {
            id: m.id || null,
            authorId: m.authorId,
            appliedAuthor: m.appliedAuthor ? { id: m.appliedAuthor.id } : null,
            appliedRegDate: mdFormat(m.appliedRegDate, DATE_TIME_FORMAT),
            recipient: m.recipient ? { id: m.recipient.id } : null,
            title: m.title || '',
            body: m.body || '',
            attachments: Attachment.convertToDtoList(m.attachments),
            observers: Observer.convertToDtoList(m.observers),
            ...Approval.convertToDto(m),
            signature: m.signature
        };
    }

    static convertToSignData(m: OfficeMemo): any {
        let signData = {
            type: 'workflow.model.OfficeMemo',
            document: OfficeMemo.convertToDto(m),
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
