import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class TranslateService {

    constructor(
        private http: Http
    ) { }

    fetchTranslations() {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Accept': 'application/json'
        });

        return this.http.get('p?id=common-captions', { headers: headers }).map(response => {
            return response.json().captions;
        });
    }
}
