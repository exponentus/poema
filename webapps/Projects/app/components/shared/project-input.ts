import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { IProjectsState } from '../../reducers/projects.reducer';
import { Project } from '../../models';

@Component({
    selector: 'project-input',
    template: `
        <selection
            class="project-input"
            [items]="projects"
            [selectedItems]="project ? [project] : []"
            [disabled]="!editable"
            [searchable]="true"
            [allowClear]="allowClear"
            [placeHolder]="placeHolder"
            (change)="onSelect($event)">
        </selection>
    `
})

export class ProjectInputComponent {
    @Input() id: string;
    @Input() placeHolder: string = '';
    @Input() editable: boolean = false;
    @Input() allowClear: boolean = false;
    @Output() select: EventEmitter<any> = new EventEmitter();
    private projects: Project[] = [];
    private project: Project;
    private sub: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('projects').subscribe((state: IProjectsState) => {
            this.projects = state.projects;
            this.project = state.projects.filter(it => it.id == this.id)[0];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSelect(m) {
        this.project = m;
        this.select.emit(this.project);
    }
}
