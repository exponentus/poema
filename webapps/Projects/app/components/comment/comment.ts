import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { AttachmentsComponent } from '../attachments';
import { DateFormatPipe } from '../../pipes';
import { Comment } from '../../models';

@Component({
    selector: 'comment',
    template: `
        <div class="comment-wrap">
            <span class="comment-author">{{ comment.author }}</span>
            <span class="comment-time">{{ comment.regDate }}</span>
            <p class="comment-text">{{ comment.comment }}</p>
            <!-- <attachments
                [entity]="comment"
                (upload)="addAttachment($event)"
                (delete)="deleteAttachment($event)">
            </attachments> -->
            <div class="buttons">
                <!-- <button type="button" class="btn btn-save" (click)="save.emit(comment)">{{ 'save' | translate }}</button> -->
                <button type="button" class="btn btn-delete" title="{{'delete' | translate}}" (click)="delete.emit(comment)">
                    <i class="fa fa-remove"></i>
                </button>
            </div>
        </div>
    `,
    directives: [AttachmentsComponent],
    pipes: [DateFormatPipe, TranslatePipe]
})

export class CommentComponent {
    @Input() comment: Comment;
    @Output() save = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();
}
