import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import {
    IAction, IPermissions,
    NbModalService, NbModal,
    tagStylerFn, STAFF_URL, REFERENCE_URL
} from '@nb/core';

import { Assignment, AssigneeEntry, Employee } from '../../models';
import { AssignmentService, ControlService } from '../../services';

@Component({
    selector: 'wf-control',
    templateUrl: './control.html',
    styleUrls: ['./control.css'],
    host: {
        '[class.wf-control]': 'true'
    },
    providers: [ControlService]
})
export class ControlComponent {
    STAFF_URL = STAFF_URL;
    REFERENCE_URL = REFERENCE_URL;
    tagStylerFn = tagStylerFn;

    @Input() model: Assignment;
    @Input() permissions: IPermissions;
    @Input() isNew: boolean = true;
    @Input() editable: boolean;
    @Input() multipleAssignee: boolean = true;
    @Input() errors: any = {};
    @Output() change = new EventEmitter();

    assigneeActions: IAction[] = [{
        customID: 'addAssignee',
        caption: 'button_add_assignee',
        className: 'btn-sm',
        hidden: false
    }, {
        customID: 'resetAssignee',
        caption: 'button_reset_assignee',
        url: 'resetAssignee',
        className: 'btn-sm',
        hidden: false
    }, {
        customID: 'removeAssignee',
        caption: 'delete',
        className: 'btn-sm',
        hidden: false
    }];

    editedAssigneeEntry: AssigneeEntry;
    selectedIds: string[] = [];
    modal: NbModal;
    openEditModal = false;

    constructor(
        private translate: TranslateService,
        private nbModalService: NbModalService,
        private assignmentService: AssignmentService,
        private controlService: ControlService
    ) { }

    ngOnInit() {
        if (!this.model.assigneeEntries || this.model.assigneeEntries.length === 0) {
            this.model.assigneeEntries = [];
        }
        this.checkActions();
    }

    ngOnDestroy() {
        if (this.modal && this.modal.display) {
            this.modal.close();
        }
    }

    setControlType(controlType: any) {
        this.model.controlType = controlType;
        this.change.emit('controlType');
    }

    // setStartDate(startDate: Date) {
    //     // this.model.startDate = startDate;
    //     this.change.emit('startDate');
    // }

    // setDueDate(dueDate: Date) {
    //     // this.model.dueDate = dueDate;
    //     this.change.emit('dueDate');
    // }

    //
    checkActions() {
        this.assigneeActions.map(it => {
            switch (it.customID) {
                case 'addAssignee':
                    it.hidden = !this.editable || this.model.status !== 'DRAFT';
                    break;
                case 'resetAssignee':
                    if (!this.permissions.RESET_ASSIGNEE) {
                        it.hidden = true;
                    }
                    it.disabled = !this.selectedIds.length;
                    break;
                case 'removeAssignee':
                    it.hidden = !this.editable || !this.model.assigneeEntries.length || this.model.status !== 'DRAFT';
                    it.disabled = !this.selectedIds.length;
                    break;
            }
        });
    }

    onAction(action: IAction) {
        switch (action.customID) {
            case 'addAssignee':
                this.editAssigneeEntry(new AssigneeEntry());
                break;
            case 'resetAssignee':
                this.openConfirmResetAssignee(action);
                break;
            case 'removeAssignee':
                this.removeSelectedAssigneeEntry();
                break;
        }
        this.checkActions();
    }

    //
    onToggleSelected(ae: AssigneeEntry) {
        let i = this.selectedIds.indexOf(ae.assignee.id);

        if (i === -1) {
            this.selectedIds.push(ae.assignee.id);
        } else {
            this.selectedIds.splice(i, 1);
        }

        this.checkActions();
    }

    editAssigneeEntry(ae: AssigneeEntry) {
        if (!ae.id) {
            ae.id = '' + Date.now();
        }
        this.editedAssigneeEntry = ae;
        this.openEditModal = true;
    }

    saveEditedAssigneeEntry(ae: AssigneeEntry) {
        if (this.model.assigneeEntries.filter(it => (it.id === ae.id)).length) {
            this.model.assigneeEntries = this.model.assigneeEntries.map(it => {
                if (it.id === ae.id) {
                    return ae;
                } else {
                    return it;
                }
            });
        } else {
            this.model.assigneeEntries.push(ae);
        }

        if (ae.coordinator) {
            this.model.assigneeEntries.filter(it => it.coordinator).map(it => it.coordinator = false);
            ae.coordinator = true;
        }
        ae.isNew = false;
        this.editedAssigneeEntry = null;
        this.openEditModal = false;
        this.checkActions();
    }

    removeSelectedAssigneeEntry() {
        this.model.assigneeEntries = this.model.assigneeEntries
            .filter(it => this.selectedIds.indexOf(it.assignee.id) == -1);

        if (this.model.assigneeEntries.length && this.model.assigneeEntries.filter(it => it.coordinator).length === 0) {
            this.model.assigneeEntries[0].coordinator = true;
        }
        this.selectedIds = [];
        this.change.emit('assigneeEntries');
        this.checkActions();
    }

    resetAssigneeEntry(action: IAction, ae: AssigneeEntry[]) {
        this.assignmentService.resetAssignee(this.model, ae).subscribe(response => {

            this.change.emit('resetAssignee');
            this.checkActions();
        });
    }

    openConfirmResetAssignee(action: IAction) {
        let assigneeEntriesToReset = this.model.assigneeEntries.filter(it => this.selectedIds.indexOf(it.assignee.id) !== -1);

        this.modal = this.nbModalService.confirm('confirm_action', assigneeEntriesToReset.map(it => it.assignee.name).join(', '), {
            label: 'button_reset_assignee',
            className: 'btn-primary',
            doAction: () => this.resetAssigneeEntry(action, assigneeEntriesToReset)
        }).show();
    }
}
