import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { IProjectsState } from '../../reducers/projects.reducer';
import { Project } from '../../models';

@Component({
    selector: 'project-select',
    directives: [DROPDOWN_DIRECTIVES],
    pipes: [TranslatePipe],
    template: `
        <div dropdown class="select">
            <div dropdown-toggle class="select-selection input">
                <span>{{project?.name}}</span>
            </div>
            <div class="dropdown-menu select-dropdown">
                <ul class="select-list scroll-shadow">
                    <li class="select-option" [class.selected]="projectId == m.id" *ngFor="let m of projects" (click)="select(m)">
                        {{m.name}}
                    </li>
                </ul>
            </div>
        </div>
    `
})

export class ProjectSelectComponent {
    @Input() projectId: string;
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    private sub: any;
    private projects: any;
    private project: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('projects').subscribe((state: IProjectsState) => {
            this.projects = state.projects;
            this.project = state.projects.filter(it => it.id == this.projectId)[0];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    select(m) {
        this.project = m;
        this.onSelect.emit(this.project);
    }
}
