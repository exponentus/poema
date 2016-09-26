import { Component, Input } from '@angular/core';

import { Project } from '../../models';

@Component({
    selector: 'project-list',
    template: require('./project-list.html')
})

export class ProjectListComponent {
    @Input() projects: Project[];
    @Input() headerVisible: boolean = true;
}
