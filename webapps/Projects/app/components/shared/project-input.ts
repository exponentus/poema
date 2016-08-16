import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { IProjectsState } from '../../reducers/projects.reducer';
import { Project } from '../../models';

@Component({
    selector: 'project-input',
    template: `
        <span class="input project-input" *ngIf="!editable">
            {{project?.name}}
        </span>
        <div dropdown class="select project-input" [class.allow-clear]="allowClear" [class.has-selected]="project" *ngIf="editable">
            <div dropdown-toggle class="select-selection input">
                <span>{{project?.name}}</span>
                <span class="placeholder">{{placeHolder}}</span>
                <div class="clear" *ngIf="allowClear && project" (click)="clear($event)">
                    <i class="fa fa-times"></i>
                </div>
            </div>
            <div class="dropdown-menu select-dropdown">
                <div class="select-search" *ngIf="searchable">
                    <input placeholder="{{'search' | translate}}" #searchInput (keyup)="search($event.target.value)" />
                    <!-- <button type="button" class="btn select-search-reset" *ngIf="searchInput.value" (click)="searchInput.value = '' && search('')">
                        <i class="fa fa-times"></i>
                    </button> -->
                </div>
                <ul class="select-list scroll-shadow" (scroll)="onScroll($event)">
                    <li class="select-option" [class.selected]="project?.id == m.id" *ngFor="let m of getProjects()" (click)="onSelect(m)">
                        {{m.name}}
                    </li>
                </ul>
            </div>
        </div>
    `
})

export class ProjectInputComponent {
    @Input() id: string;
    @Input() placeHolder: string = '';
    @Input() editable: boolean = false;
    @Input() searchable: boolean = false;
    @Input() allowClear: boolean = false;
    @Output() select: EventEmitter<any> = new EventEmitter();
    private projects: Project[] = [];
    private project: Project;
    private sub: any;
    private keyWord: string = '';

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('projects').subscribe((state: IProjectsState) => {
            this.projects = state.projects;
            this.project = state.projects.filter(it => it.id == this.id)[0];
            this.searchable = this.projects.length > 13;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getProjects() {
        if (this.keyWord) {
            return this.projects.filter(it => it.name.toLowerCase().indexOf(this.keyWord) != -1);
        }
        return this.projects;
    }

    search(keyWord) {
        this.keyWord = keyWord.toLowerCase();
    }

    clear($event) {
        $event.stopPropagation();
        this.onSelect(null);
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
