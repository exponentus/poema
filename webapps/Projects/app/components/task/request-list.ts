import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { MarkedPipe } from '../../shared/markdown';
import { TextTransformPipe, DateFormatPipe } from '../../pipes';
import { AttachmentsComponent } from '../attachment/attachments';
import { Request } from '../../models';

@Component({
    selector: 'request-list',
    template: `
        <ul class="request-list">
            <li class="request-list__header">
                <div class="request__details">
                    <div class="request__type">{{'request_type' | translate}}</div>
                    <div class="request__comment">{{'comment' | translate}}</div>
                    <div class="request__time">{{'request_time' | translate}}</div>
                </div>
            </li>
            <li class="request-list__item" *ngFor="let request of requests">
                <div class="request">
                    <div class="request__details">
                        <div class="request__type">{{request.requestType.name}}</div>
                        <div class="request__comment">{{request.comment}}</div>
                        <div class="request__time">{{request.regDate}}</div>
                        <div class="request__attachments" *ngIf="request.attachments">
                            <attachments [model]="request"></attachments>
                        </div>
                    </div>
                    <div class="request__resol">
                        <div class="request__resolution">
                            <span *ngIf="request.resolution == 'ACCEPT'">{{'accepted' | text:'L' | translate}}</span>
                            <span *ngIf="request.resolution == 'DECLINE'">{{'declined' | text:'L' | translate}}</span>
                        </div>
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
    pipes: [TranslatePipe, MarkedPipe, TextTransformPipe, DateFormatPipe]
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
