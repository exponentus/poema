import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AppService } from '../../../services';
import { Tag } from '../models';
import { xhrHeaders, createURLSearchParams } from '../../../utils/utils';

@Injectable()
export class ReferenceService {

    constructor(
        private http: Http,
        private appService: AppService
    ) { }

    fetchTags(queryParams = {}) {
        return this.http.get('/Reference/p?id=tags', {
            headers: xhrHeaders(),
            search: createURLSearchParams(queryParams)
        })
            .retry(3)
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    tags: <Tag[]>data.list,
                    meta: data.meta
                };
            })
            .catch(error => this.appService.handleError(error));
    }
}
