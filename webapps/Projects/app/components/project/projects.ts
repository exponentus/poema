import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../actions/environment.actions';
import { StaffService } from '../../services/staff.service';
import { ProjectService } from '../../services/project.service';
import { ProjectActions } from '../../actions/project.actions';
import { IEnvironmentState } from '../../reducers/environment.reducer';
import { IProjectsState } from '../../reducers/projects.reducer';
import { Project } from '../../models/project';

@Component({
    selector: 'projects',
    templateUrl: './projects.html',
    host: {
        '[class.view]': 'true',
        '[class.load]': 'loading'
    }
})

export class ProjectsComponent {
    @Input() embedded: boolean = false;
    @Input() selectable: boolean = true;
    @Input() headerVisible: boolean = true;
    @Input() titleVisible: boolean = true;
    @Input() actionsVisible: boolean = true;
    @Input() captionsVisible: boolean = true;

    private subs: any = [];

    title = 'projects';
    projects: Project[];
    meta: any = {};
    keyWord: string = '';
    loading: boolean = true;
    activeSort: string = 'name:asc';
    private params: any = {};

    constructor(
        private store: Store<any>,
        private router: Router,
        private envActions: EnvironmentActions,
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
        this.store.dispatch(this.envActions.setRedirectUrl('/projects'));

        // this.params = params;
        this.params = Object.assign({}, params, {
            'sort': this.activeSort || 'name:asc'
        });

        this.store.dispatch(this.projectActions.fetchProjects());
        this.projectService.fetchProjects(this.params).subscribe(data => {
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

    refresh() {
        this.loadData(this.params);
    }

    goToPage(params) {
        this.loadData({
            page: params.page,
            keyWord: this.keyWord
        });
    }

    onSort($event) {
        this.activeSort = $event;
        this.refresh();
    }

    newProject() {
        this.router.navigate(['/projects', 'new']);
    }

    deleteProject() {
        // this.projectService.deleteProject(this.selectedProjects).subscribe();
    }
}
