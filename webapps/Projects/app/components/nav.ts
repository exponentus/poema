import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { FETCH_NAV_PROJECTS, IProjectsState } from '../reducers/projects.reducer';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';

@Component({
    selector: '[nav]',
    template: require('../templates/nav.html'),
    directives: [ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class NavComponent {
    private storeSub: Subscription;
    private projects: Project[];

    constructor(
        private store: Store<any>,
        private router: Router,
        private projectService: ProjectService
    ) { }

    ngOnInit() {
        this.storeSub = this.store.select('projects').subscribe((data: IProjectsState) => {
            if (data) {
                this.projects = data.projects;
            }
        });

        this.projectService.fetchProjects({ nav: 1 }).subscribe(data => {
            this.store.dispatch({ type: FETCH_NAV_PROJECTS, payload: data });
        });
    }

    ngOnDestroy() {
        this.storeSub && this.storeSub.unsubscribe();
    }
}
