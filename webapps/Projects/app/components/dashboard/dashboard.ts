import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Project } from '../../models';
import { xhrHeaders, parseResponseObjects, serializeObj, transformPostResponse } from '../../utils/utils';

@Component({
    selector: '[dashboard]',
    template: `
        <div class="content-header">
            <h1 class="header-title">
                {{'dashboard' | translate}}
            </h1>
        </div>
        <div class="content-body">
            Здесь что-то будет
            <!-- <div class="dashboard" *ngFor="let project of projects">
                <header>
                    <span>{{project.name}}</span>
                    <button (click)="deleteProjectFromDashboard(project.id)">delete</button>
                </header>
                <section>
                    project data
                </section>
            </div>
            <div class="span3">
                <project-input editable="true" (select)="selectProject($event)"></project-input>
                <button class="btn" type="button" (click)="addProjectToDashboard()">{{'dashboard_add_project' | translate}}</button>
            </div> -->
        </div>
    `
})

export class DashboardComponent {

    private projects: Project[];
    private projectId: string;

    constructor(private http: Http) {
        this.fetchDashboardProjects();
    }

    private fetchDashboardProjects() {
        this.http.get('p?id=dashboard', { headers: xhrHeaders() })
            .map(response => parseResponseObjects(response.json().objects).project)
            .subscribe(data => {
                this.projects = data ? data.list : [];
            });
    }

    private addProjectToDashboard() {
        this.http.post('p?id=dashboard', `projectId=${this.projectId}`, { headers: xhrHeaders() })
            .map(response => response.json())
            .subscribe(data => {
                this.fetchDashboardProjects();
            });
    }

    private deleteProjectFromDashboard(projectId: string) {
        this.http.delete(`p?id=dashboard&projectId=${projectId}`, { headers: xhrHeaders() })
            .map(response => response.json())
            .subscribe(data => {
                this.fetchDashboardProjects();
            });
    }

    private selectProject(project: Project) {
        this.projectId = project.id;
        document.body.click();
    }
}
