export class BaseModel {
    id: string = '';
    isNew: boolean = true;
    editable: boolean = false;
    responses: any[];
    acl: any;
    url: string;

    toSerialize() {
        return this;
    }
}
