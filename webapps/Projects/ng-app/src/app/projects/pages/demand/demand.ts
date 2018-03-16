import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { NotificationService } from '@nb/core';
import { NbModalService } from '@nb/core';
import { IAction, IFormSchema } from '@nb/core';
import { AppService, ActionService } from '@nb/core';
import { AbstractFormPage } from '@nb/core';
import { DemandService } from '../../services';
import { Demand } from '../../models';

@Component({
    selector: 'demand',
    templateUrl: './demand.html',
    host: {
        '[class.component]': 'true',
        '[class.load]': 'loading'
    }
})
export class DemandComponent extends AbstractFormPage<Demand> {

    formSchema: IFormSchema[];

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
        this.formSchema = entityService.getFormSchema();
    }
}
