import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import {
    IApiOutcome, IAction,
    AppService, ActionService,
    NotificationService, NbModalService,
    AbstractFormPage, tagStylerFn,
    STAFF_URL, REFERENCE_URL
} from '@nb/core';

import { WF_URL } from '../../constants';
import { IncomingService } from '../../services';
import { Incoming } from '../../models';

@Component({
    selector: 'wf-incoming-form',
    templateUrl: './incoming-form.html',
    host: {
        '[class.component]': 'true',
        '[class.load]': 'loading'
    },
    providers: [IncomingService]
})
export class IncomingFormComponent extends AbstractFormPage<Incoming> {

    WF_URL = WF_URL;
    STAFF_URL = STAFF_URL;
    REFERENCE_URL = REFERENCE_URL;
    tagStylerFn = tagStylerFn;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public ngxTranslate: TranslateService,
        public notifyService: NotificationService,
        public nbModalService: NbModalService,
        public appService: AppService,
        public actionService: ActionService,
        public entityService: IncomingService
    ) {
        super(route, router, ngxTranslate, notifyService, nbModalService, appService, actionService, entityService);
    }

    // @Override
    onLoadDataSuccess(data: IApiOutcome) {
        super.onLoadDataSuccess(data);
        this.model.author = data.payload.employees[this.model.authorId];
    }
}
