import { Component, Inject, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import {Store} from "@ngrx/store";

import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { TextTransformPipe, DateFormatPipe } from '../../pipes';
import { PaginationComponent } from '../../shared/pagination';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { ProjectRowComponent } from './project-row';
import { ProjectComponent } from './project';

@Component({
    selector: 'projects',
    template: require('./templates/projects.html'),
    directives: [ROUTER_DIRECTIVES, PaginationComponent, ProjectRowComponent],
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe]
})

export class ProjectsComponent {
    title = 'projects';
    projects: any
    params: any = {};
    meta: any = {};
    requestProcess: boolean = true;

    constructor(
        private store: Store<any>,
        private router: Router,
        private projectService: ProjectService,
        private notifyService: NotificationService
    ) { }

    ngOnInit() {
        this.loadData();
    }

    loadData(params?) {
        this.requestProcess = true;
        this.projectService.getProjects(params).subscribe(
            data => {
                this.projects = data.projects;
                this.meta = data.meta;
                this.requestProcess = false;
            },
            errorResponse => this.handleXhrError(errorResponse)
        );
    }

    goToPage(params) {
        this.loadData({
            page: params.page
        });
    }

    newProject() {
        this.router.navigate(['/projects', 'new']);
    }

    deleteProject() {
        // this.projectService.deleteProject(this.selectedProjects).subscribe();
    }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
    }
}
