import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { TextTransformPipe, DateFormatPipe } from '../../pipes';
import { PaginationComponent } from '../../shared/pagination';
import { StaffService } from '../../services/staff.service';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { ProjectListComponent } from './project-list';
import { ProjectComponent } from './project';
import { ProjectActions } from '../../actions/project.actions';
import { IProjectsState } from '../../reducers/projects.reducer';

@Component({
    selector: 'project-list',
    template: require('./templates/projects.html'),
    // changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [
        ROUTER_DIRECTIVES,
        PaginationComponent,
        ProjectListComponent
    ],
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe]
})

export class ProjectsComponent {
    private subs: any;

    title = 'projects';
    projects: Project[];
    meta: any = {};
    loading: boolean = true;

    constructor(
        private store: Store<any>,
        private router: Router,
        private projectActions: ProjectActions,
        private projectService: ProjectService,
        private staffService: StaffService
    ) { }

    ngOnInit() {
        this.subs = this.store.select('projects').subscribe((state: IProjectsState) => {
            if (state) {
                this.projects = state.projects;
                this.meta = state.meta;
                this.loading = state.loading;
            }
        });
        this.loadData();
    }

    ngOnDestroy() {
        this.subs && this.subs.unsubscribe();
    }

    loadData(params?) {
        this.store.dispatch(this.projectActions.fetchProjects());
        this.projectService.fetchProjects(params).subscribe(data => {
            let customerIds = data.projects.map(it => it.customerId);
            this.staffService.fetchOrganizations({ ids: customerIds }).subscribe(
                payload => {
                    let orgs = payload.organizations;
                    data.projects.map(p => {
                        if (p.customerId) {
                            p.customer = orgs.filter(org => org.id == p.customerId)[0];
                        }
                    });
                    this.store.dispatch(this.projectActions.fetchProjectsFulfilled(data.projects, data.meta));
                },
                error => this.store.dispatch(this.projectActions.fetchProjectsFailed(error))
            );
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
