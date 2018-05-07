import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import {
    IApiOutcome, IAction, AppService, ActionService,
    NotificationService, NbModalService,
    AbstractFormPage, tagStylerFn,
    REFERENCE_URL, STAFF_URL
} from '@nb/core';
import { HELP_DESK_URL } from '../../constants';
import { DemandService } from '../../services/demand.service';
import { Demand } from '../../models/demand';
import { Task } from '../../models/task';

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

    createTask = false;
    priorityTypes: any;

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

    // @Override
    onLoadDataSuccess(data: IApiOutcome) {
        super.onLoadDataSuccess(data);

        let emps = data.payload.employees;
        if (this.model.tasks) {
            for (let task of this.model.tasks) {
                if (task.authorId) {
                    task.author = emps[task.authorId];
                }
                if (task.assigneeUserId) {
                    task.assignee = emps[task.assigneeUserId];
                }
            }
        }

        this.ngxTranslate.get(data.payload.priorityTypes.map(t => t.toLowerCase())).map(ts => {
            let result: any[] = [];
            for (let t in ts) {
                result.push({ id: t.toUpperCase(), title: ts[t], сls: 'priority-' + t });
            }
            return result;
        }).subscribe(res => this.priorityTypes = res);
    }

    handleChangeCreateTask() {
        this.createTask = !this.createTask;
        if (!this.model.tasks) {
            this.model.tasks = [new Task()];
        } else if (this.model.tasks.length) {
            if (Object.keys(this.model.tasks[0]).length === 0) {
                this.model.tasks = [];
            }
        }
    }

    // @Override
    save(action?: IAction) {
        if (this.model.isNew && !this.createTask) {
            this.model.tasks = [];
        }
        super.save(action);
    }
}
