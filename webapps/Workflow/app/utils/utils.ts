import { Headers, URLSearchParams, Response } from '@angular/http';

export function xhrHeaders() {
    return new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Accept': 'application/json'
    });
}

export function createURLSearchParams(params): URLSearchParams {
    let searchParams: URLSearchParams = new URLSearchParams();

    for (let i in params) {
        if (params[i] instanceof Array) {
            for (let j in params[i]) {
                searchParams.append(i, params[i][j]);
            }
        } else {
            if (typeof (params[i]) != 'undefined') {
                searchParams.set(i, params[i]);
            }
        }
    }

    return searchParams;
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
            result['actions'] = obj.actions;
            // for (let action of obj.actions) {
            //     result['actions'][action.customID] = action; // action.url ? { url: action.url } : true;
            // }
        } else {
            for (let k in obj) {
                result[k] = obj[k];
            }
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
