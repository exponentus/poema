import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { AppService, ProjectService } from '../services';
import { Project } from '../models/project';

@Component({
    selector: '[nav]',
    template: require('../templates/nav.html'),
    directives: [ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class NavComponent {
    private navs: any = {};
    projects: Project[];

    constructor(
        private router: Router,
        private appService: AppService,
        private projectService: ProjectService
    ) { }

    ngOnInit() {
        this.appService.getNav().subscribe(navs => this.navs = navs);
        this.projectService.getProjects({}).subscribe(
            data => {
                this.projects = data.projects;
            }
        );
    }
}
