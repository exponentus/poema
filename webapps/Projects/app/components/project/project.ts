import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { SwitchButtonComponent } from '../../shared/switch-button';
import { CustomerSelectComponent } from '../shared/customer-select';
import { UserSelectComponent } from '../shared/user-select';
import { AttachmentsComponent } from '../attachments';
import { TextTransformPipe } from '../../pipes';
import { AppService, ProjectService, TaskService, StaffService, ReferenceService } from '../../services';
import { Project, Organization, User } from '../../models';

@Component({
    selector: 'project',
    styles: [`project { display: block; }`],
    template: require('./templates/project.html'),
    directives: [
        ROUTER_DIRECTIVES,
        FORM_DIRECTIVES,
        DROPDOWN_DIRECTIVES,
        SwitchButtonComponent,
        CustomerSelectComponent,
        UserSelectComponent,
        AttachmentsComponent
    ],
    providers: [FormBuilder],
    pipes: [TranslatePipe, TextTransformPipe]
})

export class ProjectComponent {
    private sub: any;
    private storeSub: any;

    isReady = false;
    project: Project;
    form: ControlGroup;

    projectStatusTypes: any;
    private to;

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
                project => {
                    console.log(project);
                    this.project = project;
                    this.loadData();
                    this.isReady = true;
                },
                error => this.handleXhrError(error)
            );
        });
    }

    loadData() {
        this.projectService.getProjectStatusTypes().subscribe(data => this.projectStatusTypes = data);
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

    closeDropdown() {
        document.body.click();
    }

    selectCustomer(customer: Organization) {
        // console.log('select', customer);
        this.project.customerId = customer.id;
        this.closeDropdown();
    }

    selectManager(user: User) {
        this.project.managerUserId = user.id;
        this.closeDropdown();
    }

    selectProgrammer(user: User) {
        this.project.programmerUserId = user.id;
        this.closeDropdown();
    }

    selectTester(user: User) {
        this.project.testerUserId = user.id;
        this.closeDropdown();
    }

    selectObserver(observer: User) {
        if (!this.project.observerUserIds) {
            this.project.observerUserIds = [];
        }
        this.project.observerUserIds.push(observer.id);
        this.closeDropdown();
    }

    removeObserver(observer: User, $event) {
        this.project.observerUserIds.forEach((id, index) => {
            if (id === observer.id) {
                this.project.observerUserIds.splice(index, 1);
            }
        });

        $event.stopPropagation();
        this.closeDropdown();
    }

    addAttachment(file) {
        console.log(file);
    }
}
