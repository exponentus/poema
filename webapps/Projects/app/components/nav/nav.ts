import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { EnvironmentActions } from '../../actions';
import { INavState } from '../../reducers/nav.reducer';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';

@Component({
    selector: '[data-c=nav]',
    templateUrl: './nav.html'
})

export class NavComponent {
    private subs: Subscription[] = [];
    private projects: Project[];

    constructor(
        private router: Router,
        private store: Store<any>,
        private environmentActions: EnvironmentActions,
        private projectService: ProjectService
    ) { }

    ngOnInit() {
        this.subs.push(this.store.select('nav').subscribe((state: INavState) => {
            this.loadNavProjects();
        }));
        this.loadNavProjects();
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    isActive(instruction: any[]): boolean {
        return this.router.isActive(this.router.createUrlTree(instruction), true);
    }

    onNavClick() {
        this.store.dispatch(this.environmentActions.hideNav());
    }

    loadNavProjects() {
        this.projectService.fetchProjects().subscribe(data => {
            this.projects = data.projects;
        });
    }
}
