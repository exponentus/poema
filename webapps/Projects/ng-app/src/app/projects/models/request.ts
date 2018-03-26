import { IEntity, Attachment } from '@nb/core';
import { BaseModel } from './base-model';
import { Task } from './index';

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
            task: m.task ? { id: m.task.id } : null,
            requestType: m.requestType ? { id: m.requestType.id } : null,
            resolution: m.resolution,
            comment: m.comment,
            decisionComment: m.decisionComment,
            attachments: Attachment.convertToDtoList(m.attachments)
        };
    }
}