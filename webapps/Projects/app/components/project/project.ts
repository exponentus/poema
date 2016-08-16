import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { ProjectService } from '../../services';
import { Project, Organization, User, Attachment } from '../../models';

@Component({
    selector: 'project',
    template: require('./templates/project.html'),
    directives: [
        FORM_DIRECTIVES
    ],
    providers: [FormBuilder]
})

export class ProjectComponent {
    private sub: any;
    isReady = false;
    isNew = true;
    isEditable = false;
    isValid = true;
    project: Project;
    projectStatusTypes: any;
    errors: any = {};

    constructor(
        private store: Store<any>,
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private projectService: ProjectService,
        private notifyService: NotificationService
    ) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.projectService.fetchProjectById(params['projectId']).subscribe(
                project => {
                    this.project = project;
                    this.isNew = this.project.id == '';
                    this.isEditable = this.isNew || this.project.editable;
                    this.isReady = true;
                    this.isValid = true;
                    this.loadData();
                },
                error => this.handleXhrError(error)
            );
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    get title() {
        if (this.isNew) {
            return 'new_project';
        } else {
            return 'project';
        }
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
        this.router.navigate(['/projects']);
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
        console.log(errorResponse);
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        } else {
            this.notifyService.error(errorResponse.message).show().remove(2000);
        }
    }

    // ===

    setStatus(value) {
        this.project.status = value;
        this.validateForm('status');
    }

    setCustomer(customer: Organization) {
        this.project.customerId = customer.id;
        this.validateForm('customerId');
    }

    setManager(user: User[]) {
        this.project.managerUserId = user[0].id;
        this.validateForm('managerUserId');
    }

    setProgrammer(user: User[]) {
        this.project.programmerUserId = user[0].id;
        this.validateForm('programmerUserId');
    }

    setTester(user: User[]) {
        this.project.testerUserId = user[0].id;
        this.validateForm('testerUserId');
    }

    setObserver(observers: User[]) {
        this.project.observerUserIds = observers.map(it => it.id);
        this.validateForm('observerUserIds');
    }

    removeObserver(observer: User, $event) {
        this.project.observerUserIds.forEach((id, index) => {
            if (id === observer.id) {
                this.project.observerUserIds.splice(index, 1);
            }
        });

        $event.stopPropagation();
    }

    setFinishDate(date) {
        this.project.finishDate = date;
        this.validateForm('finishDate');
    }

    setProjectComment(text: string) {
        this.project.comment = text;
        this.validateForm('comment');
    }

    addAttachment(file) {
        let att: Attachment = new Attachment();
        att.realFileName = file.files[0];
        if (!this.project.attachments) {
            this.project.attachments = [];
        }
        if (!this.project.fsid) {
            this.project.fsid = '' + Date.now();
        }
        this.project.attachments.push(att);
    }

    deleteAttachment(attachment: Attachment) {
        this.projectService.deleteProjectAttachment(this.project, attachment).subscribe(r => {
            this.project.attachments = this.project.attachments.filter(it => it.id != attachment.id);
        });
    }

    // ===
    // validate
    validateForm(field?: string) {
        // if (field && this.errors[field]) {
        //     if (this.project[field]) {
        //         this.errors[field] = false;
        //     }
        // } else {
        //
        // }
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
