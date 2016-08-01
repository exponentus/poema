import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { LocalizedNamePipe } from '../../pipes';
import { MarkedPipe } from '../../shared/markdown';
import { TextTransformPipe, DateFormatPipe } from '../../pipes';
import { AttachmentsComponent } from '../attachment/attachments';
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
                            <button type="button" class="btn btn-primary" [disabled]="disabled" (click)="doAccept(request)">
                                {{'accept' | translate}}
                            </button>
                            <button type="button" class="btn" [disabled]="disabled" (click)="doDecline(request)">
                                {{'decline' | translate}}
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    `,
    directives: [AttachmentsComponent],
    pipes: [TranslatePipe, MarkedPipe, TextTransformPipe, DateFormatPipe, LocalizedNamePipe]
})

export class RequestListComponent {
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
