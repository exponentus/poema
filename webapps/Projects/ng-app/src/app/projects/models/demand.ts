import {
    IEntity, Attachment, BaseModel,
    DATE_TIME_FORMAT, mdFormat
} from '@nb/core';

import { Project, Tag } from './index';

export class Demand extends BaseModel {
    project: Project;
    title: string;
    regNumber: string;
    status: string = 'DRAFT'; // enum DemandStatusType
    statusDate: Date;
    demandType: IEntity; // DemandType
    customer: IEntity; // Organization
    body: string;
    tags: Tag[];
    attachments: Attachment[];

    static convertToDto(m: Demand): any {
        return {
            id: m.id || null,
            title: m.title || null,
            status: m.status || null,
            statusDate: mdFormat(m.statusDate, DATE_TIME_FORMAT),
            project: m.project ? { id: m.project.id } : null,
            demandType: m.demandType ? { id: m.demandType.id } : null,
            customer: m.customer ? { id: m.customer.id } : null,
            body: m.body || null,
            tags: Tag.convertToDtoList(m.tags),
            attachments: Attachment.convertToDtoList(m.attachments)
        };
    }
}
