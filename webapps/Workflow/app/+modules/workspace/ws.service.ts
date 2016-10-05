import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { AppService } from '../../services/app.service';
import { App } from './app.model';
import { xhrHeaders } from '../../utils/utils';

@Injectable()
export class WorkspaceService {

    constructor(
        private http: Http,
        private appService: AppService
    ) { }

    fetchApps() {
        return this.http.get('/p?id=apps', { headers: xhrHeaders() })
            .map(response => response.json().objects)
            .catch(error => this.appService.handleError(error));
    }
}
