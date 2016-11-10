import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { AppService } from '../../services';
import { App } from './app.model';
import { xhrHeaders } from '../../utils/utils';

@Injectable()
export class WorkspaceService {

    constructor(
        private http: Http,
        private appService: AppService
    ) { }
}
