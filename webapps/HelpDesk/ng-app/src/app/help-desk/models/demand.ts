import { DATE_TIME_FORMAT, mdFormat, IEntity, Attachment, Observer, User } from '@nb/core';

import { Task } from './task';

export class Demand {
    id: string;
    project: IEntity;
    originator: User;
    tasks: Task[];
    title: string;
    regNumber: string;
    status: string = 'DRAFT'; // enum DemandStatusType
    statusDate: Date;
    demandType: IEntity;
    wayOfInteraction: IEntity;
    body: string;
    observers: Observer[];
    tags: IEntity[];
    attachments: Attachment[];

    static convertToDto(m: Demand): any {
        return {
            id: m.id || null,
            title: m.title || null,
            status: m.status || null,
            statusDate: mdFormat(m.statusDate, DATE_TIME_FORMAT),
            project: m.project ? { id: m.project.id } : null,
            originator: m.originator ? { id: m.originator.userID } : null,
            tasks: Task.convertToDtoList(m.tasks),
            demandType: m.demandType ? { id: m.demandType.id } : null,
            wayOfInteraction: m.wayOfInteraction ? { id: m.wayOfInteraction.id } : null,
            body: m.body || null,
            observers: Observer.convertToDtoList(m.observers || []),
            tags: m.tags ? m.tags.map(it => { return { id: it.id }; }) : [],
            attachments: Attachment.convertToDtoList(m.attachments)
        };
    }
}
