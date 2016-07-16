import { Component, Input, Output } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { OrganizationInputComponent } from '../shared/organization-input';
import { UserInputComponent } from '../shared/user-input';
import { TextTransformPipe, DateFormatPipe } from '../../pipes';
import { Project } from '../../models';

@Component({
    selector: 'project-list',
    template: require('./templates/project-list.html'),
    directives: [ROUTER_DIRECTIVES, OrganizationInputComponent, UserInputComponent],
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe]
})

export class ProjectListComponent {
    @Input('projects') set _projects(projects: Project[]) {
        this.projects = projects;
        this.selectedIds = [];
        this.isSelectedAll = false;
    }
    @Input() showHeader: boolean = true;

    private projects: Project[];
    private selectedIds: string[] = [];
    private isSelectedAll: boolean = false;

    isSelected(id: string) {
        return this.selectedIds.indexOf(id) != -1;
    }

    toggleSelectAll() {
        if (this.selectedIds.length) {
            this.selectedIds = [];
            this.isSelectedAll = false;
        } else {
            this.selectedIds = this.projects.map(it => it.id);
            this.isSelectedAll = true;
        }
    }

    toggleSelected(id: string) {
        let index = this.selectedIds.indexOf(id);
        if (index != -1) {
            this.selectedIds.push(id);
        } else {
            this.selectedIds.splice(index);
            if (!this.selectedIds.length) {
                this.isSelectedAll = false;
            }
        }
    }
}
