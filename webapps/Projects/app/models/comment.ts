import { Attachment } from './attachment';

export class Comment {
    id: string = '';
    fsid: string;
    regDate: Date;
    taskId: string;
    comment: string;
    attachments: Attachment[];
}
