export class Project {
    id: string = '';
    author: string;
    regDate: Date;
    wasRead: boolean;
    fsid: string = '';

    name: string;
    status: string = 'DRAFT';
    customerId: string;
    managerUserId: string;
    programmerUserId: string;
    testerUserId: string;
    observerUserIds: string[];
    comment: string;
    finishDate: Date;
    hasAttachment: boolean;
    attachmentIds: string[];
}
