import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import {
    AppService, ActionService,
    NotificationService, NbModalService,
    AbstractFormPage, tagStylerFn,
    REFERENCE_URL, STAFF_URL
} from '@nb/core';
import { DemandService } from '../../services/demand.service';
import { Demand } from '../../models/demand';
import { HELP_DESK_URL } from '../../constants';

@Component({
    selector: 'demand',
    templateUrl: './demand.html',
    host: {
        '[class.component]': 'true',
        '[class.load]': 'loading'
    }
})
export class DemandComponent extends AbstractFormPage<Demand> {

    STAFF_URL = STAFF_URL;
    REFERENCE_URL = REFERENCE_URL;
    HELP_DESK_URL = HELP_DESK_URL;
    tagStylerFn = tagStylerFn;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public ngxTranslate: TranslateService,
        public notifyService: NotificationService,
        public nbModalService: NbModalService,
        public appService: AppService,
        public actionService: ActionService,
        public entityService: DemandService
    ) {
        super(route, router, ngxTranslate, notifyService, nbModalService, appService, actionService, entityService);
    }
}
