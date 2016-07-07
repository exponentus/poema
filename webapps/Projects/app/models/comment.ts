import { Attachment } from './attachment';

export class Comment {
    id: string = '';
    fsid: string;
    comment: string;
    attachments: Attachment[];
}
