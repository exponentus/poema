import { DATE_TIME_FORMAT, mdFormat, IEntity, Attachment } from '@nb/core';

import { Task } from './task';

export class Demand {
    id: string;
    project: IEntity;
    task: Task;
    title: string;
    regNumber: string;
    status: string = 'DRAFT'; // enum DemandStatusType
    statusDate: Date;
    demandType: IEntity;
    wayOfInteraction: IEntity;
    body: string;
    tags: IEntity[];
    attachments: Attachment[];

    static convertToDto(m: Demand): any {
        return {
            id: m.id || null,
            title: m.title || null,
            status: m.status || null,
            statusDate: mdFormat(m.statusDate, DATE_TIME_FORMAT),
            project: m.project ? { id: m.project.id } : null,
            task: m.task ? Task.convertToDto(m.task) : null,
            demandType: m.demandType ? { id: m.demandType.id } : null,
            wayOfInteraction: m.wayOfInteraction ? { id: m.wayOfInteraction.id } : null,
            body: m.body || null,
            tags: m.tags ? m.tags.map(it => { return { id: it.id }; }) : [],
            attachments: Attachment.convertToDtoList(m.attachments)
        };
    }
}
