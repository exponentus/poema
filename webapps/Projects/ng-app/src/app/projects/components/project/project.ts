import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { NotificationService } from '@nb/core';
import { NbModalService } from '@nb/core';
import { IApiOutcome } from '@nb/core';
import { AppService, ActionService } from '@nb/core';
import { AbstractFormPage } from '@nb/core';
import { dateDuration } from '@nb/core';
import { STAFF_URL } from '@nb/core';
import { ProjectService } from '../../services';
import { Project } from '../../models';

@Component({
    selector: 'project',
    templateUrl: './project.html',
    host: {
        '[class.component]': 'true',
        '[class.load]': 'loading'
    }
})
export class ProjectComponent extends AbstractFormPage<Project> {

    STAFF_URL = STAFF_URL;
    dateDuration = dateDuration;
    projectStatusTypes: any;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public ngxTranslate: TranslateService,
        public notifyService: NotificationService,
        public nbModalService: NbModalService,
        public appService: AppService,
        public actionService: ActionService,
        public entityService: ProjectService
    ) {
        super(route, router, ngxTranslate, notifyService, nbModalService, appService, actionService, entityService);
    }

    get finishDateDurationFromNow() {
        if (!this.model || !this.model.finishDate) {
            return null;
        }
        let dd = dateDuration('now', `${this.model.finishDate}`);
        if (dd == '0') {
            return 'today';
        } else if (dd == '1') {
            return 'tomorrow';
        }
        return dd;
    }

    // @Override
    loadDataSuccess(data: IApiOutcome) {
        super.loadDataSuccess(data);
        //
        this.entityService.getProjectStatusTypes(data.payload.projectStatusTypes).subscribe(pst => this.projectStatusTypes = pst);

        let emps = data.payload.employees;
        if (this.model.authorId) {
            this.model.author = emps[this.model.authorId];
        }
        if (this.model.managerUserId) {
            this.model.manager = emps[this.model.managerUserId];
        }
        if (this.model.programmerUserId) {
            this.model.programmer = emps[this.model.programmerUserId];
        }
        if (this.model.testerUserId) {
            this.model.tester = emps[this.model.testerUserId];
        }
        if (this.model.observerUserIds) {
            this.model.observers = [];
            for (let k in emps) {
                if (this.model.observerUserIds.indexOf(emps[k].userID) != -1) {
                    this.model.observers.push(emps[k]);
                }
            }
        }
        if (this.model.representativesUserIds) {
            this.model.representatives = [];
            for (let k in emps) {
                if (this.model.representativesUserIds.indexOf(emps[k].userID) != -1) {
                    this.model.representatives.push(emps[k]);
                }
            }
        }
    }
}
