import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { TextTransformPipe, DateFormatPipe } from '../../pipes';
import { PaginationComponent } from '../../shared/pagination';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { ProjectRowComponent } from './project-row';
import { ProjectComponent } from './project';
import { FETCH_PROJECTS, IProjectsState } from '../../reducers/projects.reducer';

@Component({
    selector: 'project-list',
    template: require('./templates/projects.html'),
    // changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [
        ROUTER_DIRECTIVES,
        PaginationComponent,
        ProjectRowComponent
    ],
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe]
})

export class ProjectsComponent {
    private storeSub: any;

    title = 'projects';
    projects: Project[];
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
        this.storeSub = this.store.select('projects').subscribe((data: IProjectsState) => {
            if (data) {
                this.projects = data.projects;
                this.meta = data.meta;
                this.requestProcess = false;
            }
        });

        this.loadData();
    }

    ngOnDestroy() {
        this.storeSub && this.storeSub.unsubscribe();
    }

    loadData(params?) {
        this.projectService.fetchProjects(params).subscribe(data => {
            this.store.dispatch({ type: FETCH_PROJECTS, payload: data });
        });
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
}
