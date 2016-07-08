import { Attachment } from './attachment';
import { Request } from './request';

export class Task {
    id: string = '';
    author: string;
    regDate: Date;
    wasRead: boolean;
    fsid: string;

    projectId: string;
    parentTaskId: string;
    hasSubtasks: string[];
    taskTypeId: string;
    status: string = 'DRAFT';
    priority: string = 'NORMAL';
    title: string;
    body: string;
    assigneeUserId: string;
    startDate: Date;
    dueDate: Date;
    tagIds: string[];
    hasAttachments: boolean;
    attachmentIds: string[];

    attachments: Attachment[];
    requests: Request[];
}
