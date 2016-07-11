import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { Request } from '../../models';

@Component({
    selector: 'task-requests',
    template: `
        <ul>
            <li *ngFor="let r of requests">
                {{ r.comment }}
                {{ r.requestType.name }}
                {{ r.resolution }}
                {{ r.resolutionTime }}
            </li>
        </ul>
    `,
    directives: [],
    pipes: [TranslatePipe]
})

export class TaskRequestsComponent {
    @Input() requests: Request[];
    @Output() accept = new EventEmitter<any>();
    @Output() decline = new EventEmitter<any>();
}
