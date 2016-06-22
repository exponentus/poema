import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Store } from "@ngrx/store";

import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { AppService } from '../services/app.service';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';

@Component({
    selector: '[nav]',
    template: require('../templates/nav.html'),
    directives: [ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class NavComponent {
    private sub: any;
    private navs: any = {};
    @Input() projects: Project[];

    constructor(
        private store: Store<any>,
        private router: Router,
        private appService: AppService,
        private projectService: ProjectService
    ) {
        this.sub = this.store.select('projects').subscribe(data => {
            this.projects = data['projects'];
            console.log(this.projects);
        });
    }

    ngOnInit() {
        // this.appService.getNav().subscribe(navs => this.navs = navs);
        // this.projectService.getProjects({}).subscribe(
        //     data => {
        //         this.projects = data.projects;
        //     }
        // );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
