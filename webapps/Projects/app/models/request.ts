import { Attachment } from './attachment';
import { RequestType } from './request-type';

export class Request {
    id: string = '';
    fsid: string = '' + Date.now();
    regDate: Date;
    taskId: string;
    requestTypeId: string;
    requestType: RequestType;
    resolution: string;
    resolutionTime: Date;
    comment: string = '';
    hasAttachments: boolean;
    attachments: Attachment[];
}
