import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { IProjectsState } from '../../reducers/projects.reducer';
import { Project } from '../../models';

@Component({
    selector: 'project-input',
    template: `
        <span *ngIf="!editable">
            {{project?.name}}
        </span>
        <div dropdown class="select project-input" *ngIf="editable">
            <div dropdown-toggle class="select-selection input">
                <span>{{project?.name}}</span>
            </div>
            <div class="dropdown-menu select-dropdown">
                <div class="select-search" *ngIf="searchable">
                    <input placeholder="{{'search' | translate}}" #searchInput (keyup)="search($event.target.value)" />
                    <button type="button" class="btn select-search-reset" *ngIf="searchInput.value" (click)="searchInput.value = '' && search('')">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
                <ul class="select-list scroll-shadow" (scroll)="onScroll($event)">
                    <li class="select-option" [class.selected]="project?.id == m.id" *ngFor="let m of projects" (click)="onSelect(m)">
                        {{m.name}}
                    </li>
                </ul>
            </div>
        </div>
    `,
    directives: [DROPDOWN_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class ProjectInputComponent {
    @Input() projectId: string;
    @Input() editable: boolean = false;
    @Input() searchable: boolean = false;
    @Output() select: EventEmitter<any> = new EventEmitter();
    private projects: Project[] = [];
    private project: Project;
    private sub: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('projects').subscribe((state: IProjectsState) => {
            this.projects = state.projects;
            this.project = state.projects.filter(it => it.id == this.projectId)[0];
            this.searchable = this.projects.length > 13;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    search(keyWord) {
        console.log(keyWord);
    }

    onSelect(m) {
        this.project = m;
        this.select.emit(this.project);
        document.body.click();
    }

    onScroll($event) {
        let {scrollHeight, clientHeight, scrollTop} = $event.target;
        if ((scrollHeight - clientHeight) == scrollTop) {
            console.log('scroll end');
        }
    }
}
