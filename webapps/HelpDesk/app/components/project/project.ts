import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { IEnvironmentState } from '../../reducers/environment.reducer';
import { NotificationService } from '../../shared/notification';
import { ProjectService } from '../../services';
import { Project, Organization, Employee, Attachment } from '../../models';
import { imgToBase64 } from '../../utils/utils';

@Component({
    selector: 'project',
    templateUrl: './project.html'
})

export class ProjectComponent {
    private subs: any = [];
    isReady = false;
    isNew = true;
    isEditable = false;
    isValid = true;
    project: Project;
    projectStatusTypes: any;
    actions: any = {};
    errors: any = {};
    redirectUrl: any;

    constructor(
        private store: Store<any>,
        private router: Router,
        private route: ActivatedRoute,
        private translate: TranslateService,
        private projectService: ProjectService,
        private notifyService: NotificationService
    ) { }

    ngOnInit() {
        this.subs.push(this.store.select('environment').subscribe((state: IEnvironmentState) => {
            this.redirectUrl = state.redirectUrl;
        }));

        this.subs.push(this.route.params.subscribe(params => {
            this.loadProject(params['projectId']);
        }));

        this.loadData();
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    // === title
    get title() {
        if (this.isNew) {
            return 'new_project';
        } else {
            return 'project';
        }
    }

    // === check available actions
    get canSave() {
        return this.actions['save_and_close'] === true;;
    }

    get canDelete() {
        return this.actions['delete_document'] === true;;
    }
    // =====

    // ===
    loadProject(projectId: string) {
        this.projectService.fetchProjectById(projectId).subscribe(
            ({project, actions}) => {
                this.project = project;
                this.actions = actions || {};
                this.isNew = this.project.id == '';
                this.isEditable = this.isNew || this.project.editable;
                this.isReady = true;
                this.isValid = true;
            },
            error => this.handleXhrError(error)
        );
    }

    loadData() {
        this.projectService.getProjectStatusTypes().subscribe(pst => this.projectStatusTypes = pst);
    }

    saveProject() {
        let noty = this.notifyService.process(this.translate.instant('wait_while_document_save')).show();
        this.projectService.saveProject(this.project).subscribe(
            response => {
                noty.set({ type: 'success', message: response.message });
                this.close();
                return response;
            },
            error => {
                noty.remove();
                this.handleXhrError(error);
                this.handleValidationError(error);
                return error;
            },
            () => noty.remove(1500)
        );
    }

    deleteProject() {
        this.projectService.deleteProject([this.project]).subscribe(
            data => this.close(),
            error => this.handleXhrError(error)
        );
    }

    close() {
        this.router.navigateByUrl(this.redirectUrl);
    }

    handleValidationError(error: any) {
        let errors = {};

        if (error.validation) {
            this.isValid = false;
            for (let err of error.validation.errors) {
                errors[err.field] = {
                    message: err.message,
                    error: err.error
                };
            }
        }

        this.errors = errors;
    }

    handleXhrError(errorResponse) {
        this.notifyService.error(errorResponse.message).show().remove(2000);
    }

    // ===

    setStatus(value) {
        this.project.status = value;
        this.validateForm('status');
    }

    setCustomer(customer: Organization) {
        this.project.customer = customer;
        this.project.customerId = customer ? customer.id : '';
        this.validateForm('customer');
    }

    setManager(employee: Employee) {
        this.project.manager = employee;
        this.project.managerUserId = employee ? employee.userID : '';
        this.validateForm('managerUserId');
    }

    setProgrammer(employee: Employee) {
        this.project.programmer = employee;
        this.project.programmerUserId = employee ? employee.userID : '';
        this.validateForm('programmerUserId');
    }

    setTester(employee: Employee) {
        this.project.tester = employee;
        this.project.testerUserId = employee ? employee.userID : '';
        this.validateForm('testerUserId');
    }

    setObserver(observers: Employee[]) {
        this.project.observers = observers;
        this.project.observerUserIds = observers ? observers.map(it => it.userID) : null;
        this.validateForm('observerUserIds');
    }

    removeObserver(observer: Employee, $event) {
        $event.stopPropagation();
        this.project.observers = this.project.observers.filter(it => it.id != observer.id);
    }

    setFinishDate(date) {
        this.project.finishDate = date;
        this.validateForm('finishDate');
    }

    setProjectComment(text: string) {
        this.project.comment = text;
        this.validateForm('comment');
    }

    addAttachment(data) {
        let att: Attachment = new Attachment();
        att.realFileName = data.response.files[0];
        if (!this.project.attachments) {
            this.project.attachments = [];
        }
        if (!this.project.fsid) {
            this.project.fsid = '' + Date.now();
        }
        if (!data.files[0].type.match('image.*')) {
            this.project.attachments.push(att);
        } else {
            imgToBase64(data.files[0], (e2) => {
                att.base64 = e2.target.result;
                this.project.attachments.push(att);
            });
        }
    }

    deleteAttachment(attachment: Attachment) {
        this.projectService.deleteProjectAttachment(this.project, attachment).subscribe(r => {
            this.project.attachments = this.project.attachments.filter(it => it.id != attachment.id);
        });
    }

    // ===
    // validate
    validateForm(field?: string) {
        for (let errField in this.errors) {
            if (this.project[errField]) {
                this.errors[errField] = false;
            }
        }

        let isValid = true;
        for (let errField in this.errors) {
            if (this.errors[errField] !== false) {
                isValid = false;
                break;
            }
        }
        this.isValid = isValid;
    }
}
