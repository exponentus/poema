import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import {
    IApiOutcome, IAction, tagStylerFn, validateModel,
    REFERENCE_URL, STAFF_URL
} from '@nb/core';
import { Task } from '../../models/task';
import { HELP_DESK_URL } from '../../constants';

@Component({
    selector: 'demand-task-edit',
    templateUrl: './demand-task-edit.html'
})
export class DemandTaskEditComponent {

    STAFF_URL = STAFF_URL;
    REFERENCE_URL = REFERENCE_URL;
    HELP_DESK_URL = HELP_DESK_URL;
    tagStylerFn = tagStylerFn;

    @Input() model: Task;
    @Input() payload: any;
    @Input() errors: any = {};
    priorityTypes: any[];

    constructor(
        public ngxTranslate: TranslateService
    ) { }

    ngOnInit() {
        this.ngxTranslate.get(this.payload.priorityTypes.map(t => t.toLowerCase())).map(ts => {
            let result: any[] = [];
            for (let t in ts) {
                result.push({ id: t.toUpperCase(), title: ts[t], сls: 'priority-' + t });
            }
            return result;
        }).subscribe(res => this.priorityTypes = res);
    }

    ngDoCheck() {
        validateModel(this.model, this.errors);
    }
}
