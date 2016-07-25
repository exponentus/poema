import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { IProjectsState } from '../../reducers/projects.reducer';
import { ProjectActions } from '../../actions/project.actions';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';

@Component({
    selector: '[data-c=nav]',
    template: require('./nav.html'),
    directives: [ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class NavComponent {
    private sub: Subscription;
    private projects: Project[];

    constructor(
        private store: Store<any>,
        private projectActions: ProjectActions,
        private projectService: ProjectService
    ) { }

    ngOnInit() {
        this.sub = this.store.select('projects').subscribe((state: IProjectsState) => {
            this.projects = state.projects;
        });
        this.loadNavProjects();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    loadNavProjects() {
        this.projectService.fetchProjects().subscribe(data => {
            this.store.dispatch(this.projectActions.fetchProjectsFulfilled(data.projects, data.meta));
        });
    }
}
