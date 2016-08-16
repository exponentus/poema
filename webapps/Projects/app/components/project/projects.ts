import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { StaffService } from '../../services/staff.service';
import { ProjectService } from '../../services/project.service';
import { ProjectActions } from '../../actions/project.actions';
import { IEnvironmentState } from '../../reducers/environment.reducer';
import { IProjectsState } from '../../reducers/projects.reducer';
import { Project } from '../../models/project';

@Component({
    selector: 'projects',
    template: require('./templates/projects.html')
})

export class ProjectsComponent {
    private subs: any = [];

    title = 'projects';
    projects: Project[];
    meta: any = {};
    keyWord: string = '';
    loading: boolean = true;

    constructor(
        private store: Store<any>,
        private router: Router,
        private projectActions: ProjectActions,
        private projectService: ProjectService,
        private staffService: StaffService
    ) { }

    ngOnInit() {
        this.subs.push(this.store.select('environment').subscribe((state: IEnvironmentState) => {
            if (this.keyWord != state.keyWord) {
                this.loadData({
                    keyWord: state.keyWord
                });
            }
            this.keyWord = state.keyWord;
        }));

        this.subs.push(this.store.select('projects').subscribe((state: IProjectsState) => {
            if (state) {
                this.projects = state.projects;
                this.meta = state.meta;
                this.loading = state.loading;
            }
        }));
        this.loadData();
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
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
            page: params.page,
            keyWord: this.keyWord
        });
    }

    newProject() {
        this.router.navigate(['/projects', 'new']);
    }

    deleteProject() {
        // this.projectService.deleteProject(this.selectedProjects).subscribe();
    }
}
