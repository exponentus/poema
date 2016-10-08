import { Attachment } from '../../../models/attachment';
import { RequestType } from './request-type';

export class Request {
    id: string = '';
    regDate: Date;
    fsid: string = '' + Date.now();
    acl: any = {};

    taskId: string;
    requestTypeId: string;
    requestType: RequestType;
    resolution: string;
    resolutionTime: Date;
    comment: string = '';
    hasAttachments: boolean;
    attachments: Attachment[];
}
