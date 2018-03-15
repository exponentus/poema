import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { NotificationService } from '@nb/core';
import { NbModalService } from '@nb/core';
import { IApiOutcome, IAction } from '@nb/core';
import { AppService, ActionService } from '@nb/core';
import { AbstractFormPage } from '@nb/core';
import { tagStylerFn } from '@nb/core';
import { STAFF_URL } from '@nb/core';
import { REFERENCE_URL } from '@nb/core';
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
    loadDataSuccess(data: IApiOutcome) {
        super.loadDataSuccess(data);
        this.model.author = data.payload.employees[this.model.authorId];
    }
}
