import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../../actions/environment.actions';
import { NavActions } from '../../../../actions/nav.actions';
import { ProjectService } from '../../services/project.service';
import { IEnvironmentState } from '../../../../reducers/environment.reducer';
import { Project } from '../../models/project';

@Component({
    selector: 'projects',
    templateUrl: './projects.html',
    host: {
        '[class.loadable]': 'true',
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
    employees: any = {};
    keyWord: string = '';
    loading: boolean = true;
    activeSort: string = 'name:asc';
    private params: any = {};

    constructor(
        private store: Store<any>,
        private router: Router,
        private envActions: EnvironmentActions,
        private navActions: NavActions,
        private projectService: ProjectService
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

        this.loadData();
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    loadData(params?) {
        this.loading = true;
        this.store.dispatch(this.envActions.setRedirectUrl('/projects'));
        this.store.dispatch(this.navActions.reloadNav());

        this.params = Object.assign({}, params, {
            'sort': this.activeSort || 'name:asc'
        });

        this.projectService.fetchProjects(this.params).subscribe(data => {
            this.employees = data.data.employees;
            this.projects = data.projects;
            this.meta = data.meta;
            this.loading = false;
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
