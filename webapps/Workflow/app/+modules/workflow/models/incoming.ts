import { Outgoing } from './outgoing';

export class Incoming {
    id: string = '';
    isNew: boolean = true;
    editable: boolean = false;
    children: any[];

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

    //
    toSerialize() {
        return Object.assign(this, {
            sender: this.sender ? this.sender.id : null,
            docLanguage: this.docLanguage ? this.docLanguage.id : null,
            docType: this.docType ? this.docType.id : null,
            responseTo: this.responseTo ? this.responseTo.id : null
        });
    }
}
