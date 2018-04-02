import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import {
    IApiOutcome, IAction,
    AppService, ActionService,
    NotificationService, NbModalService,
    AbstractFormPage, STAFF_URL
} from '@nb/core';

import { ReportService } from '../../services';
import { Report, Employee } from '../../models';
import { WF_URL } from '../../constants';

@Component({
    selector: 'report-form',
    templateUrl: './report-form.html',
    host: {
        '[class.component]': 'true',
        '[class.load]': 'loading'
    },
    providers: [ReportService]
})
export class ReportFormComponent extends AbstractFormPage<Report> {

    STAFF_URL = STAFF_URL;
    WF_URL = WF_URL;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public ngxTranslate: TranslateService,
        public notifyService: NotificationService,
        public nbModalService: NbModalService,
        public appService: AppService,
        public actionService: ActionService,
        public entityService: ReportService
    ) {
        super(route, router, ngxTranslate, notifyService, nbModalService, appService, actionService, entityService);
    }

    // @Override
    loadDataSuccess(data: IApiOutcome) {
        super.loadDataSuccess(data);
        this.model.author = data.payload.employees[this.model.authorId];
    }
}
