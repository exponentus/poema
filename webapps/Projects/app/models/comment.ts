import { Attachment } from './attachment';

export class Comment {
    id: string = '';
    comment: string;
    attachments: Attachment[];
}
