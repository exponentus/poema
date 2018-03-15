import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { NotificationService } from '@nb/core';
import { NbModalService } from '@nb/core';
import { IApiOutcome, IAction, IFormSchema } from '@nb/core';
import { AppService, ActionService } from '@nb/core';
import { AbstractFormPage } from '@nb/core';
import { tagStylerFn } from '@nb/core';
import { STAFF_URL } from '@nb/core';
import { REFERENCE_URL } from '@nb/core';
import { ApplicationForVehicleService } from '../../services';
import { RR_URL } from '../../constants';
import { ApplicationForVehicle } from '../../models';

@Component({
    selector: 'rr-application-form',
    templateUrl: './application-form.html',
    host: {
        '[class.component]': 'true',
        '[class.load]': 'loading'
    }
})
export class ApplicationFormComponent extends AbstractFormPage<ApplicationForVehicle> {

    STAFF_URL = STAFF_URL;
    REFERENCE_URL = REFERENCE_URL;
    tagStylerFn = tagStylerFn;
    flag: { [key: string]: boolean }; // approvalProcessingBlockRequireCommentIfNo

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public ngxTranslate: TranslateService,
        public notifyService: NotificationService,
        public nbModalService: NbModalService,
        public appService: AppService,
        public actionService: ActionService,
        public entityService: ApplicationForVehicleService
    ) {
        super(route, router, ngxTranslate, notifyService, nbModalService, appService, actionService, entityService);
    }

    // @Override
    loadDataSuccess(data: IApiOutcome) {
        super.loadDataSuccess(data);
        this.flag = data.payload.flag;
        this.model.author = data.payload.employees[this.model.authorId];
        if (this.model.blocks) {
            // this.model.blocks = this.model.blocks.sort((a, b) => a.position > b.position ? 1 : -1);
            this.model.blocks.forEach(itblock => {
                // if (itblock.approvers) {
                //     itblock.approvers = itblock.approvers.sort((a, b) => a.position > b.position ? 1 : -1);
                // }
                if (!itblock.id) {
                    itblock.tid = '' + Date.now();
                }
            });
        }
    }

    checkToolbarActions() {
        super.checkToolbarActions();
        this.actions.filter(it => it.customID === 'startApproving').map((action: IAction) => {
            if (!this.model.blocks || this.model.blocks.length === 0) {
                action.hidden = true;
            } else {
                action.hidden = false;
                action.disabled = !this.isValid;
            }
        });
    }
}
