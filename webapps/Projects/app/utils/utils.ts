import { URLSearchParams, Response } from '@angular/http';

export function createURLSearchParams(_params): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();
    for (let p in _params) {
        params.set(encodeURIComponent(p), encodeURIComponent(_params[p]));
    }
    return params;
}

export function serializeObj(obj): string {
    let result = [];
    for (var property in obj) {
        result.push(encodeURIComponent(property) + '=' + encodeURIComponent(obj[property]));
    }
    return result.join('&');
}

export function parseResponseObjects(objects: any): any {
    let result: any = [];

    for (let obj of objects) {
        if (obj.kind) {
            result[obj.kind] = obj;
        } else if (obj.list && obj.meta && obj.type) {
            result[obj.type] = obj;
        } else if (obj.name && obj.value) { // fsid?
            result[obj.name] = obj.value;
        } else {
            result.push(obj);
        }
    }

    return result;
}

export function transformPostResponse(response: Response): any {
    let json = response.json();
    return Object.assign(json, {
        ok: json.type === 'DOCUMENT_SAVED',
        message: json.captions ? json.captions.type : json.message
    });
}

export function createCookie(name, value, days): void {
    let expires;

    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    } else {
        expires = '';
    }
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + expires + '; path=/';
}
