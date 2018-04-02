import { Component, Input, Output, EventEmitter } from '@angular/core';

import { cloneObject, STAFF_URL } from '@nb/core';
import { AssigneeEntry } from '../../models';

@Component({
    selector: 'wf-control-assignee-modal-form',
    templateUrl: './control-assignee-modal-form.html'
})
export class ControlAssigneeModalFormComponent {
    STAFF_URL = STAFF_URL;

    @Input('model') set _assigneeEntry(assigneeEntry: AssigneeEntry) {
        this.assigneeEntry = cloneObject(assigneeEntry);
    }
    @Input() editable = true;

    @Output() cancel = new EventEmitter();
    @Output() confirm = new EventEmitter<AssigneeEntry>();

    assigneeEntry: AssigneeEntry;
}
