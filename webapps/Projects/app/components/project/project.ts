import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { SwitchButtonComponent } from '../../shared/switch-button';
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
        SwitchButtonComponent
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

    users: User[];
    customers: Organization[];
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
                    //this.loadData();
                    this.isReady = true;
                },
                error => this.handleXhrError(error)
            );
        });
    }

    // loadData() {
    //     Observable.forkJoin(
    //         this.staffService.getOrganizations(),
    //         this.appService.getUsers(),
    //         this.projectService.getProjectStatusTypes(),
    //         this.staffService.getOrganizationById(this.project.customer ? this.project.customer.id : '')
    //     ).subscribe(
    //         data => {
    //             this.customers = data[0].organizations;
    //             this.users = data[1];
    //             this.projectStatusTypes = data[2];
    //             let org = data[3];
    //
    //             // if (this.project.customer) {
    //             // this.customers.forEach(it => {
    //             //     if (it.id === this.project.customer.id) {
    //             //         this.project.customer = it;
    //             //     }
    //             // });
    //             console.log(org);
    //             if (this.project.customer && org && org.organizations) {
    //                 this.project.customer = org.organizations[0];
    //             }
    //             // }
    //
    //             this.users.forEach(it => {
    //                 if (this.project.manager) {
    //                     if (it.id === this.project.manager.id) {
    //                         this.project.manager = it;
    //                     }
    //                 }
    //                 if (this.project.programmer) {
    //                     if (it.id === this.project.programmer.id) {
    //                         this.project.programmer = it;
    //                     }
    //                 }
    //                 if (this.project.tester) {
    //                     if (it.id === this.project.tester.id) {
    //                         this.project.tester = it;
    //                     }
    //                 }
    //             });
    //             if (this.project.observers) {
    //                 for (let obs of this.project.observers) {
    //                     let obsU: any = this.users.filter(it => it.id == obs.id);
    //                     if (obsU.length) {
    //                         obs.userName = obsU[0].userName;
    //                         obs.login = obsU[0].login;
    //                     }
    //                 }
    //             }
    //
    //             console.log(this);
    //         },
    //         error => {
    //             this.handleXhrError(error)
    //         },
    //         () => { this.isReady = true });
    // }

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

    onScrollSelectList($el, listId) {
        // if end scroll
        if ($el.scrollHeight <= $el.scrollTop + $el.offsetHeight) {
            if (listId === 'customer') {
                this.searchCustomer({
                    page: 2
                });
            }
        }
    }

    searchCustomer(e) {
        let param: any = {};
        if (e.target) {
            param.keyword = e.target.value;
        } else {
            param = e;
        }
        this.staffService.getOrganizations(param).subscribe(data => {
            if (param.keyword) {
                this.customers = data.organizations;
            } else {
                this.customers = this.customers.concat(data.organizations);
            }
        });
    }

    selectCustomer(customer: Organization) {
        //this.project.customer = customer;
        this.closeDropdown();
    }

    selectManager(user: User) {
        //this.project.manager = user;
        this.closeDropdown();
    }

    selectProgrammer(user: User) {
        //this.project.programmer = user;
        this.closeDropdown();
    }

    selectTester(user: User) {
        //this.project.tester = user;
        this.closeDropdown();
    }

    selectObserver(observer: User) {
        // if (!this.project.observers) {
        //     this.project.observers = [];
        // }
        // this.project.observers.push(observer);
        this.closeDropdown();
    }

    removeObserver(observer: User, $event) {
        // this.project.observers.forEach((it, index) => {
        //     if (it.id === observer.id) {
        //         this.project.observers.splice(index, 1);
        //     }
        // });

        $event.stopPropagation();
        this.closeDropdown();
    }
}
