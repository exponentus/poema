import { Attachment } from './attachment';
import { Project } from './project';
import { Request } from './request';

export class Task {
    id: string = '';
    author: string;
    regDate: Date;
    editable: boolean = false;
    wasRead: boolean;
    fsid: string = '' + Date.now();
    acl: any = {};

    project: Project;
    projectId: string;
    parentTask: Task;
    parentTaskId: string;
    hasSubtasks: boolean;
    hasRequests: boolean;
    hasComments: boolean;
    taskTypeId: string;
    status: string = 'DRAFT';
    priority: string = 'NORMAL';
    title: string;
    body: string;
    assigneeUserId: string;
    startDate: Date;
    dueDate: Date;
    tagIds: string[];
    customerObservation: boolean = false;
    hasAttachments: boolean;
    attachmentIds: string[];

    attachments: Attachment[];
    requests: Request[];
}
