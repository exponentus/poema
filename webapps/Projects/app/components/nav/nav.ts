import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { IProjectsState } from '../../reducers/projects.reducer';
import { ProjectActions } from '../../actions/project.actions';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';

@Component({
    selector: '[data-c=nav]',
    template: require('./nav.html')
})

export class NavComponent {
    private subs: Subscription[] = [];
    private projects: Project[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<any>,
        private projectActions: ProjectActions,
        private projectService: ProjectService
    ) { }

    ngOnInit() {
        this.subs.push(this.route.params.subscribe(params => {
            console.log('nav', params);
        }));

        this.subs.push(this.store.select('projects').subscribe((state: IProjectsState) => {
            this.projects = state.projects;
        }));

        this.loadNavProjects();
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    isActive(instruction: any[]): boolean {
        return this.router.isActive(this.router.createUrlTree(instruction), true);
    }

    loadNavProjects() {
        this.projectService.fetchProjects().subscribe(data => {
            this.store.dispatch(this.projectActions.fetchProjectsFulfilled(data.projects, data.meta));
        });
    }
}
