import { Attachment } from './attachment';

export class Request {
    id: string = '';
    taskId: string;
    requestTypeId: string;
    resolution: string;
    resolutionTime: Date;
    comment: string;
    hasAttachment: boolean;
    attachments: Attachment[];
}
