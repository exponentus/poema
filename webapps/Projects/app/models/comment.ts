import { Attachment } from './attachment';

export class Comment {
    id: string = '';
    fsid: string;
    regDate: Date;
    comment: string;
    attachments: Attachment[];
}
