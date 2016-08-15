import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { MarkedPipe } from '../../shared/markdown';
import { Request } from '../../models';

@Component({
    selector: 'request-list',
    template: `
        <ul class="request-list">
            <li class="request-list__item" *ngFor="let request of requests">
                <div class="request">
                    <header class="request__header">
                        <div class="request__type">{{request.requestType | localizedName}}</div>
                        <div class="request__time">{{request.regDate}}</div>
                    </header>
                    <section class="request__content">
                        <div class="request__comment">{{request.comment}}</div>
                        <div class="request__attachments" *ngIf="request.attachments.length">
                            <attachments [model]="request"></attachments>
                        </div>
                    </section>
                    <div class="request__resolution">
                        <span class="{{request.resolution | text:'L'}}" *ngIf="request.resolution == 'ACCEPT'">
                            <i class="fa fa-check"></i>
                            {{'accepted' | translate}}
                        </span>
                        <span class="{{request.resolution | text:'L'}}" *ngIf="request.resolution == 'DECLINE'">
                            <i class="fa fa-times"></i>
                            {{'declined' | translate}}
                        </span>
                        <div class="request__resolution_time">{{request.resolutionTime}}</div>
                        <div class="request__buttons" *ngIf="request.resolution == 'UNKNOWN'">
                            <button type="button" class="btn btn-primary" (click)="doAccept(request)">
                                {{'accept' | translate}}
                            </button>
                            <button type="button" class="btn" (click)="doDecline(request)">
                                {{'decline' | translate}}
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    `,
    pipes: [MarkedPipe]
})

export class RequestListComponent {
    @Input() requests: Request[];
    @Output() accept = new EventEmitter<any>();
    @Output() decline = new EventEmitter<any>();

    doAccept(request: Request) {
        this.accept.emit(request);
    }

    doDecline(request: Request) {
        this.decline.emit(request);
    }
}
