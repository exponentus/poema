import { Attachment } from './attachment';

export class Project {
    id: string = '';
    author: string;
    regDate: Date;
    wasRead: boolean;
    fsid: string = '' + Date.now();

    name: string;
    status: string = 'DRAFT';
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
