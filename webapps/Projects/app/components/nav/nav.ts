import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { IProjectsState } from '../../reducers/projects.reducer';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';

@Component({
    selector: '[data-c=nav]',
    template: require('./nav.html'),
    directives: [ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class NavComponent {
    private storeSub: Subscription;
    private projects: Project[];

    constructor(
        private store: Store<any>,
        private projectService: ProjectService
    ) { }

    ngOnInit() {
        this.store.select('projects').subscribe((state: IProjectsState) => {
            this.projects = state.projects;
        });

        this.loadNavProjects();
    }

    ngOnDestroy() {
        this.storeSub && this.storeSub.unsubscribe();
    }

    loadNavProjects() {
        this.projectService.fetchProjects().subscribe(action => {
            this.store.dispatch(action);
        });
    }
}
