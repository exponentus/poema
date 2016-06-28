import { Component, Input, Output } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { TextTransformPipe, DateFormatPipe } from '../../pipes';
import { CustomerCellComponent } from '../shared/customer-cell';
import { UserCellComponent } from '../shared/user-cell';
import { Project } from '../../models/project';

@Component({
    selector: 'project-row',
    template: require('./templates/project-row.html'),
    directives: [ROUTER_DIRECTIVES, CustomerCellComponent, UserCellComponent],
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe]
})

export class ProjectRowComponent {
    @Input() project: Project;
    // @Output
    private selected: boolean = false;

    toggleSelected() {
        this.selected = !this.selected;
    }
}
