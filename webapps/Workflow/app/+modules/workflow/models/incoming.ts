import { Outgoing } from './outgoing';

export class Incoming {
    id: string = '';
    regNumber: string;
    appliedRegDate: Date;
    sender: any; // Organization;
    senderRegNumber: string;
    senderAppliedRegDate: Date;
    title: string;
    body: string;
    docLanguage: any; // DocumentLanguage;
    docType: any; // DocumentType;
    responseTo: Outgoing;
    attachments: any; // Attachment[]
    control: any; // Control
}
