export class BaseModel {
    id: string = '';
    isNew: boolean = true;
    editable: boolean = false;
    kind: string;
    author: any;
    authorId: string;
    responses: any[];
    url: string;
    apiUrl: string;

    signature: string;

    constructor() { }
}
