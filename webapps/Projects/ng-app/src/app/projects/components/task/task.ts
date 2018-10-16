import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

import {
    IApiOutcome, IAction, ICanDeactivate,
    AppService, ActionService, NotificationService, NbModalService,
    AbstractFormPage, dateDuration, tagStylerFn,
    STAFF_URL, REFERENCE_URL
} from '@nb/core';
import { IMilestones } from '@nb/components';

import { PROJECTS_URL } from '../../constants';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models';

@Component({
    selector: 'task',
    templateUrl: './task.html',
    styleUrls: ['./task.css'],
    host: {
        '[class.component]': 'true',
        '[class.load]': 'loading'
    }
})
export class TaskComponent extends AbstractFormPage<Task> implements ICanDeactivate {

    REFERENCE_URL = REFERENCE_URL;
    STAFF_URL = STAFF_URL;
    PROJECTS_URL = PROJECTS_URL;
    dateDuration = dateDuration;
    tagStylerFn = tagStylerFn;

    isSubtask = false;
    isInitiativeTask = false;

    saveAsDraftAction: IAction;

    milestones: IMilestones;
    activity: any;
    priorityTypes: any;

    saveAsDraftRequestIncomplete: boolean = false;
    _canDeactivate: boolean = true;
    timeout: any;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public ngxTranslate: TranslateService,
        public notifyService: NotificationService,
        public nbModalService: NbModalService,
        public appService: AppService,
        public actionService: ActionService,
        public entityService: TaskService
    ) {
        super(route, router, ngxTranslate, notifyService, nbModalService, appService, actionService, entityService);
    }

    get startDueDateDuration() {
        if (!this.model || !this.model.startDate || !this.model.dueDate) {
            return null;
        }
        let dd = dateDuration(`${this.model.startDate}`, `${this.model.dueDate}`);
        // if (dd == '0') {
        //     return 'today';
        // } else if (dd == '1') {
        //     return 'tomorrow';
        // }
        return dd;
    }

    getEmbeddedViewUrl() {
        return '/Projects/api/tasks?parentTaskId=' + this.model.id + '&execution=true&isTreeMode=true&expandedIds=' + this.model.id;
    }

    canDeactivate(): boolean {
        if (this.saveAsDraftRequestIncomplete) {
            clearTimeout(this.timeout);
            if (this.modelHasChanges()) {
                this.saveAsDraft();
            }
        }
        return this._canDeactivate;
    }

    assignYourself($event: Event) {
        $event.preventDefault();
        if (this.data.employees) {
            let emp = this.data.employees[this.appService.employee.userID];
            if (emp) {
                (<Task>this.model).assignee = emp;
            }
        }
    }

    onAction(action: IAction) {
        switch (action.customID) {
            case 'declineApprovalBlock':
                this.openDeclineApprovalBlockDialog(action);
                break;
            case 'task_cancel':
                this.openTaskCancellationDialog(action);
                break;
            case 'acknowledged':
                this.openAcknowledgedDialog(action);
                break;
            case 'sendReminder':
                this.handleReminderAction(action);
                break;
            default:
                if (action.customID === 'save_and_close') {
                    this.saveAsDraftRequestIncomplete = false;
                    clearTimeout(this.timeout);
                }
                super.onAction(action);
                break;
        }
    }

    onLoadDataSuccess(data: IApiOutcome) {
        super.onLoadDataSuccess(data);

        this.saveAsDraftAction = this.actions.find(it => it.customID === 'SAVE_AS_DRAFT');
        if (this.saveAsDraftAction) {
            this.saveAsDraftAction.onSuccess = {
                customID: 'saveAsDraftActionSuccessFn',
                type: 'CUSTOM_ACTION',
                payloadType: 'MODEL',
                fn: (response: IApiOutcome) => {
                    this._canDeactivate = true;
                    this.notifyService
                        .toast(this.ngxTranslate.instant('changes_saved'))
                        .show().remove(500);
                    if (this.model.isNew) {
                        this.router.navigate([response.payload.model.url]);
                    }
                }
            } as IAction;
            this.saveAsDraftAction.onError = {
                customID: 'saveAsDraftActionErrorFn',
                type: 'CUSTOM_ACTION',
                payloadType: 'MODEL',
                fn: (response: IApiOutcome) => {
                    this._canDeactivate = false;
                    this.notifyService.error(this.ngxTranslate.instant('request_error')).show().remove(1000);
                    setTimeout(() => {
                        this._canDeactivate = true;
                    }, 100);
                }
            } as IAction;
        }

        this.entityService.getPriorityTypes(data.payload.priorityTypes).subscribe(tpt => this.priorityTypes = tpt);
        this.activity = data.payload.activity;
        this.milestones = data.payload.milestones;
        if (data.payload.parentTask) {
            this.model.parent = data.payload.parentTask;
        }
        this.isSubtask = this.model.parent ? true : false;
        this.isInitiativeTask = !!this.model.demand;

        let emps = data.payload.employees;
        if (this.model.authorId) {
            this.model.author = emps[this.model.authorId];
        }
        if (this.model.assigneeUserId) {
            this.model.assignee = emps[this.model.assigneeUserId];
        }
        if (this.model.observerUserIds) {
            this.model.observers = [];
            for (let k in emps) {
                if (this.model.observerUserIds.indexOf(emps[k].userID) != -1) {
                    this.model.observers.push(emps[k]);
                }
            }
        }

        this.calcModelHash();
    }

    saveAsDraft() {
        this.onAction(this.saveAsDraftAction);
    }

    handleModelChange($event: any) {
        $event && $event.preventDefault && $event.preventDefault();
        if (!this.saveAsDraftAction) {
            return;
        }

        this.saveAsDraftRequestIncomplete = true;
        this._canDeactivate = true;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            if (!this.modelHasChanges()) {
                return;
            }
            this.saveAsDraftRequestIncomplete = false;
            this.saveAsDraft();
        }, 4000);
    }

    openAcknowledgedDialog(action: IAction) {
        let modal = {
            type: 'dialog',
            title: 'estimate_in_hours',
            model: {
                editable: true,
                estimateInHours: null
            },
            formSchema: [{
                tabTitle: 'properties',
                active: true,
                fieldsets: [{
                    fields: [{
                        type: 'number',
                        hideLabel: true,
                        name: 'estimateInHours',
                        placeholder: 'estimate_in_hours',
                        required: true,
                        autofocus: true,
                        datalist: [6, 12, 24, 48, 72]
                    }]
                }]
            }],
            buttons: [{
                label: 'cancel',
                click: (modal: any, event: any) => {
                    modal.close();
                }
            }, {
                label: action.caption,
                className: 'btn-primary',
                disabled: () => { return !modal.model.estimateInHours || modal.model.estimateInHours <= 0; },
                click: (modal: any, event: any) => {
                    if (modal.model.estimateInHours && modal.model.estimateInHours > 0) {
                        super.onAction(action, {
                            target: <Task>{ id: this.model.id },
                            payload: modal.model.estimateInHours ? modal.model.estimateInHours.trim() : 0
                        });
                        modal.close();
                    }
                }
            }]
        };

        this.nbModalService.create(modal).show();
    }

    openTaskCancellationDialog(action: IAction) {
        let modal = {
            type: 'dialog',
            title: 'cancel_task',
            model: {
                editable: true,
                comment: ''
            },
            formSchema: [{
                tabTitle: 'properties',
                active: true,
                fieldsets: [{
                    fields: [{
                        type: 'textarea',
                        hideLabel: true,
                        name: 'comment',
                        placeholder: 'cancel_reason',
                        className: 'span7',
                        required: true,
                        autofocus: true
                    }]
                }]
            }],
            buttons: [{
                label: 'cancel',
                click: (modal: any, event: any) => {
                    modal.close();
                }
            }, {
                label: 'cancel_task',
                className: 'btn-primary',
                click: (modal: any, event: any) => {
                    super.onAction(action, {
                        target: <Task>{ id: this.model.id },
                        payload: modal.model.comment.trim()
                    });
                    modal.close();
                }
            }]
        };

        this.nbModalService.create(modal).show();
    }

    openDeclineApprovalBlockDialog(action: IAction) {
        const model = { editable: true, comment: '' };
        const modal = {
            type: 'dialog',
            title: 'confirm_action',
            model: model,
            formSchema: [{
                tabTitle: 'properties',
                active: true,
                fieldsets: [{
                    fields: [{
                        type: 'textarea',
                        hideLabel: true,
                        name: 'comment',
                        placeholder: 'comment',
                        className: 'span7',
                        required: true
                    }]
                }]
            }],
            buttons: [{
                label: 'cancel',
                click: (modal: any, event: any) => {
                    modal.close();
                }
            }, {
                label: 'decline',
                className: 'btn-primary',
                disabled: () => { return !model.comment; },
                click: (modal: any, event: any) => {
                    if (modal.model.comment && modal.model.comment.trim()) {
                        super.onAction(action, {
                            target: <Task>{ id: this.model.id },
                            payload: modal.model.comment.trim()
                        });
                        modal.close();
                    }
                }
            }]
        };

        this.nbModalService.create(modal).show();
    }

    handleReminderAction(action: IAction) {
        this.entityService.fetch(`${action.url}/${this.model.id}`, {})
            .pipe(map(response => {
                this.openReminderDialog(action, response.payload.text);
            })).subscribe();
    }

    openReminderDialog(action: IAction, reminderText: string) {
        let modal = {
            type: 'dialog',
            title: 'reminder',
            className: 'nb-modal-lg',
            model: {
                editable: true,
                comment: reminderText || ''
            },
            formSchema: [{
                tabTitle: 'properties',
                active: true,
                fieldsets: [{
                    fields: [{
                        type: 'markdown',
                        hideLabel: true,
                        name: 'comment',
                        placeholder: 'comment',
                        required: true,
                        autofocus: true
                    }]
                }]
            }],
            buttons: [{
                label: 'cancel',
                click: (modal: any, event: any) => {
                    modal.close();
                }
            }, {
                label: action.caption,
                className: 'btn-primary',
                disabled: () => { return !modal.model.comment || !modal.model.comment.trim(); },
                click: (modal: any, event: any) => {
                    super.onAction(action, {
                        target: <Task>{ id: this.model.id },
                        payload: modal.model.comment.trim()
                    });
                    modal.close();
                }
            }]
        };

        this.nbModalService.create(modal).show();
    }
}
