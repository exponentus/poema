import { IEntity, Attachment, BaseModel } from '@nb/core';
import { Task } from './task';

export class Request extends BaseModel {
    task: Task;
    requestType: IEntity;
    resolution: string;
    resolutionTime: Date;
    comment: string = '';
    decisionComment: string = '';
    attachments: Attachment[];
    hasAttachments: boolean;

    static convertToDto(m: Request): any {
        return {
            id: m.id || null,
            task: m.task ? { id: m.task.id, actualExecTimeInHours: m.task.actualExecTimeInHours } : null,
            requestType: m.requestType ? { id: m.requestType.id } : null,
            resolution: m.resolution,
            comment: m.comment,
            decisionComment: m.decisionComment,
            attachments: Attachment.convertToDtoList(m.attachments)
        };
    }
}
