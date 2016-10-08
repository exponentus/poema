import { Organization } from './organization';
import { Attachment } from '../../../models/attachment';

export class Project {
    id: string = '';
    author: string;
    authorId: string;
    regDate: Date;
    editable: boolean = false;
    wasRead: boolean;
    fsid: string = '' + Date.now();
    acl: any = {};

    name: string;
    status: string = 'DRAFT';
    customer: Organization;
    customerId: string;
    managerUserId: string;
    programmerUserId: string;
    testerUserId: string;
    observerUserIds: string[];
    comment: string;
    finishDate: Date;
    hasAttachments: boolean;
    attachmentIds: string[];

    attachments: Attachment[];
}
