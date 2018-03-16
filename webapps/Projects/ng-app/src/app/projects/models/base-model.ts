export class BaseModel {
    id: string = '';
    isNew: boolean = true;
    editable: boolean = false;
    kind: string;
    author: any;
    authorId: string;
    regDate: Date;
    responses: any[];
    url: string;
    apiUrl: string;
}
