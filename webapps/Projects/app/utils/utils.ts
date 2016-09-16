import { URLSearchParams, Response } from '@angular/http';

export function createURLSearchParams(_params): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();
    for (let p in _params) {
        if (_params[p] instanceof Array) {
            for (let t in _params[p]) {
                params.append(encodeURIComponent(p), encodeURIComponent(_params[p][t]));
            }
        } else {
            if (typeof (_params[p]) != 'undefined') {
                params.set(encodeURIComponent(p), encodeURIComponent(_params[p]));
            }
        }
    }
    return params;
}

export function serializeObj(obj): string {
    let result = [];
    for (let property in obj) {
        result.push(encodeURIComponent(property) + '=' + encodeURIComponent(obj[property]));
    }
    return result.join('&');
}

export function parseResponseObjects(objects: any): any {
    let result: any = {};
    for (let obj of objects) {
        if (obj.kind || obj.entityKind) {
            result[obj.kind || obj.entityKind] = obj;
        } else if (obj.list && obj.meta && obj.type) {
            result[obj.type] = obj;
        } else if (obj.name && obj.value) {
            result[obj.name] = obj.value;
        } else if (obj.actions) {
            result['actions'] = {};
            for (let action of obj.actions) {
                result['actions'][action.customID] = action.url ? { url: action.url } : true;
            }
        } else {
            for (let k in obj) {
                result[k] = obj[k];
            }
        }
    }

    return result;
}

export function parseListObjectsToKeyValue(list: any): any {
    let result = [];
    if (list) {
        for (let it of list) {
            result[it.id] = it;
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

export function imgToBase64(file, callback) {
    var fr = new FileReader();
    fr.onload = callback;
    fr.readAsDataURL(file);
}
