import { Attachment, Project, Request, Employee, Tag, TaskType } from './index';

export class Task {
    id: string = '';
    author: any;
    authorId: string;
    regDate: Date;
    editable: boolean = false;
    wasRead: boolean;
    fsid: string = '' + Date.now();
    acl: any = {};
    children: any = {};

    project: Project;
    projectId: string;
    parentTask: Task;
    parentTaskId: string;
    hasSubtasks: boolean;
    hasRequests: boolean;
    hasComments: boolean;
    taskType: TaskType;
    taskTypeId: string;
    status: string = 'DRAFT';
    priority: string = 'NORMAL';
    regNumber: string;
    title: string;
    body: string;
    assignee: Employee;
    assigneeUserId: string;
    startDate: Date;
    dueDate: Date;
    tags: Tag[];
    observers: Employee[];
    observerUserIds: string[];
    customerObservation: boolean = false;
    cancellationComment: string;
    hasAttachments: boolean;
    attachmentIds: string[];

    attachments: Attachment[];
    requests: Request[];
}
