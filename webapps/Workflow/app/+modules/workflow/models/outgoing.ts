export class Outgoing {
    id: string = '';
    regNumber: string;
    appliedRegDate: Date;
    recipient: any; // Organization;
    title: string;
    docLanguage: any; // DocumentLanguage;
    docType: any; // DocumentType;
    body: string;
    attachments: any; // Attachment[]

    //
    toSerialize() {
        return Object.assign(this, {
            recipient: this.recipient ? this.recipient.id : null,
            docLanguage: this.docLanguage ? this.docLanguage.id : null,
            docType: this.docType ? this.docType.id : null
        });
    }
}
