import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { IProjectsState } from '../reducers/projects.reducer';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';

@Component({
    selector: '[data-component=nav]',
    template: `
        <ul>
            <li>
                <a [routerLink]="['/tasks', 'my']" class="nav-link">
                    <i class="fa fa-pencil"></i>
                    <span>{{'my_tasks' | translate}}</span>
                </a>
            </li>
            <li>
                <a [routerLink]="['/tasks', 'inbox']" class="nav-link">
                    <i class="fa fa-inbox"></i>
                    <span>{{'tasks_assigned_to_me' | translate}}</span>
                </a>
            </li>
            <li>
                <a [routerLink]="['/']" class="nav-link">
                    <i class="fa fa-calendar"></i>
                    <span>{{'dashboard' | translate}}</span>
                </a>
            </li>
            <li class="divider"></li>
            <li>
                <a [routerLink]="['/projects']" class="nav-link">
                    <i class="fa fa-puzzle-piece"></i>
                    <span>{{'projects' | translate}}</span>
                </a>
                <ul>
                    <li *ngFor="let project of projects">
                        <a [routerLink]="['/project', project.id, 'tasks']" class="nav-link">
                            <i class="fa fa-file-text-o"></i>
                            <span>{{project.name}}</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    `,
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
