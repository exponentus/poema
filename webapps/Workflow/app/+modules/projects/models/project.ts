import { Attachment } from '../../../models/attachment';
import { Organization } from './organization';
import { Employee } from './employee';

export class Project {
    id: string = '';
    author: any;
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
    manager: Employee;
    managerUserId: string;
    programmer: Employee;
    programmerUserId: string;
    tester: Employee;
    testerUserId: string;
    observers: Employee[];
    observerUserIds: string[];
    comment: string;
    finishDate: Date;
    hasAttachments: boolean;
    attachmentIds: string[];

    attachments: Attachment[];
}
