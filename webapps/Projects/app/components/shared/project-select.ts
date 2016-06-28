import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
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
    private projects: any;
    private project: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.store.select('projects').subscribe((state: any) => {
            this.projects = state.projects;
            this.project = state.projects.filter(it => it.id == this.projectId)[0];
        });
    }

    select(m) {
        this.project = m;
        this.onSelect.emit(this.project);
    }
}
