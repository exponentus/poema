import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AppService } from './app.service';
import { xhrHeaders, createURLSearchParams } from '../utils/utils';

@Injectable()
export class SearchService {

    constructor(
        private http: Http,
        private appService: AppService
    ) { }

    search(params: any = {}) {
        return this.http.get(`do/view/ftsearch/${encodeURIComponent(params.keyword)}/${params.page}`, {
            headers: xhrHeaders()
        })
            .map(response => response.json())
            .catch(error => this.appService.handleError(error));
    }
}
