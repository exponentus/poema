import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { DatepickerDirective } from '../../shared/datepicker/datepicker';
import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { MarkdownEditorComponent } from '../../shared/markdown';
import { SwitchButtonComponent } from '../../shared/switch-button';
import { OrganizationInputComponent, UserInputComponent } from '../shared';
import { AttachmentsComponent } from '../attachment/attachments';
import { TextTransformPipe } from '../../pipes';
import { AppService, ProjectService, TaskService, StaffService, ReferenceService } from '../../services';
import { Project, Organization, User, Attachment } from '../../models';

@Component({
    selector: 'project',
    template: require('./templates/project.html'),
    directives: [
        ROUTER_DIRECTIVES,
        FORM_DIRECTIVES,
        DROPDOWN_DIRECTIVES,
        SwitchButtonComponent,
        OrganizationInputComponent,
        UserInputComponent,
        AttachmentsComponent,
        MarkdownEditorComponent,
        DatepickerDirective
    ],
    providers: [FormBuilder],
    pipes: [TranslatePipe, TextTransformPipe]
})

export class ProjectComponent {
    private sub: any;
    private storeSub: any;
    isReady = false;
    isNew = true;
    isEditable = true;
    project: Project;
    form: ControlGroup;
    projectStatusTypes: any;

    constructor(
        private store: Store<any>,
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private appService: AppService,
        private projectService: ProjectService,
        private staffService: StaffService,
        private notifyService: NotificationService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            status: [''],
            customerUserId: [''],
            managerUserId: [''],
            programmerUserId: [''],
            testerUserId: [''],
            observerUserIds: [''],
            comment: [''],
            finishDate: [''],
            attachments: ['']
        });

        this.sub = this.route.params.subscribe(params => {
            this.projectService.fetchProjectById(params['projectId']).subscribe(
                action => {
                    this.project = action.payload.project;
                    this.loadData();
                    this.isReady = true;
                    this.isNew = this.project.id == '';
                },
                error => this.handleXhrError(error)
            );
        });
    }

    loadData() {
        this.projectService.getProjectStatusTypes().subscribe(pst => this.projectStatusTypes = pst);
    }

    saveProject() {
        let noty = this.notifyService.process(this.translate.instant('wait_while_document_save')).show();
        this.projectService.saveProject(this.project).subscribe(
            response => {
                console.log(response);
                noty.set({ type: 'success', message: response.message }).remove(1500);
                this.close();
                return response;
            },
            error => {
                console.log(error);
                noty.set({ type: 'error', message: error.message }).remove(1500);
                this.errorSaveProject(error);
                return error;
            },
            () => noty.remove(1500)
        );
    }

    errorSaveProject(errorResponse) {
        console.log(errorResponse);
    }

    deleteProject() {
        this.projectService.deleteProject([this.project]).subscribe(data => {
            this.close();
        });
    }

    close() {
        this.router.navigate(['/projects']);
    }

    handleXhrError(errorResponse) {
        console.log(errorResponse);
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
    }

    setStatus(value) {
        this.project.status = value;
    }

    setCustomer(customer: Organization) {
        this.project.customerId = customer.id;
    }

    setManager(user: User[]) {
        this.project.managerUserId = user[0].id;
    }

    setProgrammer(user: User[]) {
        this.project.programmerUserId = user[0].id;
    }

    setTester(user: User[]) {
        this.project.testerUserId = user[0].id;
    }

    setObserver(observers: User[]) {
        this.project.observerUserIds = observers.map(it => it.id);
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
    }

    setProjectComment(text: string) {
        this.project.comment = text;
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
}
