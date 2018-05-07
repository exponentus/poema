import {
    IEntity, Attachment, BaseModel,
    DATE_TIME_FORMAT, mdFormat
} from '@nb/core';

export class Task extends BaseModel {
    project: IEntity;
    taskType: IEntity;
    status: string = 'DRAFT';
    priority: 'UNKNOWN' | 'URGENT' | 'HIGH' | 'MEDIUM' | 'NORMAL' | 'LOW' = 'NORMAL';
    approvalStatus: string;
    regNumber: string;
    title: string;
    body: string;
    assignee: IEntity;
    assigneeUserId: string;
    startDate: Date;
    dueDate: Date;
    initiative: boolean;
    tags: IEntity[];
    observers: IEntity[];
    observerUserIds: string[];
    customerObservation: boolean = false;
    cancellationComment: string;
    attachments: Attachment[];
    hasAttachments: boolean;

    static convertToDto(m: Task): any {
        return {
            id: m.id || null,
            project: m.project ? { id: m.project.id } : null,
            taskType: m.taskType ? { id: m.taskType.id } : null,
            status: m.status,
            priority: m.priority,
            regNumber: m.regNumber,
            title: m.title ? m.title : '',
            body: m.body ? m.body : '',
            assigneeUserId: m.assignee ? m.assignee.userID : 0,
            startDate: mdFormat(m.startDate, DATE_TIME_FORMAT),
            dueDate: mdFormat(m.dueDate, DATE_TIME_FORMAT),
            initiative: m.initiative,
            tags: m.tags ? m.tags.map(it => { return { id: it.id }; }) : [],
            observerUserIds: m.observers ? m.observers.map(it => it.userID) : [],
            customerObservation: m.customerObservation,
            attachments: Attachment.convertToDtoList(m.attachments)
        };
    }

    static convertToDtoList(list: Task[]): any[] {
        return list ? list.map(task => { return Task.convertToDto(task); }) : [];
    }
}
