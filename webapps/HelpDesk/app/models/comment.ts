import { Attachment } from './attachment';

export class Comment {
    id: string = '';
    fsid: string = '' + Date.now();
    regDate: Date;
    taskId: string;
    comment: string;
    attachments: Attachment[];
}
