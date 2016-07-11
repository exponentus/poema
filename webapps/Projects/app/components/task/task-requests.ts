import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { Request } from '../../models';

@Component({
    selector: 'task-requests',
    template: `
        <ul>
            <li *ngFor="let r of requests">
                <span>{{ r.comment }}</span>
                <span>{{ r.requestType.name }}</span>
                <span *ngIf="r.resolution != 'UNKNOWN'">
                    {{ r.resolution }}
                    {{ r.resolutionTime }}
                </span>
                <span *ngIf="r.resolution == 'UNKNOWN'">
                    <button class="btn" (click)="doAccept(r)" [disabled]="disabled" type="button">Accept</button>
                    <button class="btn" (click)="doDecline(r)" [disabled]="disabled" type="button">Decline</button>
                </span>
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

    private disabled = false;

    doAccept(request: Request) {
        this.disabled = true;
        this.accept.emit(request);
    }

    doDecline(request: Request) {
        this.disabled = true;
        this.decline.emit(request);
    }
}
