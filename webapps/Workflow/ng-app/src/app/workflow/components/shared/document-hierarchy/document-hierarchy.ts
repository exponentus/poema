import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { IEntity, createApiUrl } from '@nb/core';

@Component({
    selector: 'wf-document-hierarchy',
    templateUrl: './document-hierarchy.html'
})
export class DocumentHierarchyComponent {

    @Input() model: IEntity;

    getViewUrl() {
        return `${createApiUrl(this.model.url)}/responses`;
    }
}
