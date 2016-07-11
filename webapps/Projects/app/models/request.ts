import { Attachment } from './attachment';

export class Request {
    id: string = '';
    fsid: string = '' + Date.now();
    regDate: Date;
    taskId: string;
    requestTypeId: string;
    resolution: string;
    resolutionTime: Date;
    comment: string;
    hasAttachments: boolean;
    attachments: Attachment[];
}
