import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class TranslateService {

    constructor(
        private http: Http
    ) { }

    fetchTranslations(modulePath: string = '') {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Accept': 'application/json'
        });
        let translationsUrl = (modulePath ? modulePath + '/' : '') + 'p?id=common-captions';

        return this.http.get(translationsUrl, { headers: headers })
            .retry(3)
            .map(response => response.json().captions);
    }
}
