import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class TranslateService {

    private translations: any = null;

    constructor(
        private http: Http
    ) { }

    fetchTranslations() {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Accept': 'application/json'
        });

        return this.http.get('p?id=common-captions', { headers: headers }).map(response => {
            this.translations = response.json().captions;
            return this.translations;
        });
    }

    getTranslations() {
        return this.translations;
    }
}