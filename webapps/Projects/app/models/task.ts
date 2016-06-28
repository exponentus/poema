export class Task {
    id: string = '';
    author: string;
    regDate: Date;
    wasRead: boolean;
    fsid: string = '1';

    projectId: string;
    parentTaskId: string;
    subtaskIds: string[];
    taskTypeId: string;
    status: string = 'DRAFT';
    priority: string = 'NORMAL';
    body: string;
    assigneeUserId: string;
    startDate: Date;
    dueDate: Date;
    tagIds: string[];
    hasAttachment: boolean;
    attachmentIds: string[];
}
