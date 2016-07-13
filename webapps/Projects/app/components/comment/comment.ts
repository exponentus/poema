import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { AttachmentsComponent } from '../attachments';
import { DateFormatPipe } from '../../pipes';
import { Comment } from '../../models';

@Component({
    selector: 'comment',
    template: `
        <div class="comment" [class.edit]="edit" [class.saving]="saving">
            <div class="comment__avatar"></div>
            <div class="comment__details">
                <span class="comment__author">{{comment.authorId}}</span>
                <span class="comment__time">{{comment.regDate}}</span>
                <p class="comment__text" *ngIf="!edit">{{comment.comment}}</p>
                <div class="comment__editor" *ngIf="edit">
                    <textarea [(ngModel)]="commentText" [disabled]="saving"></textarea>
                    <button type="button" class="btn btn-cancel" [disabled]="saving" (click)="toggleEdit()">{{'cancel' | translate}}</button>
                    <button type="button" class="btn btn-primary btn-save" [disabled]="saving" (click)="saveComment()">{{'save' | translate}}</button>
                </div>
                <!-- <attachments
                    [entity]="comment"
                    (upload)="addAttachment($event)"
                    (delete)="deleteAttachment($event)">
                </attachments> -->
            </div>
            <div class="comment__buttons" *ngIf="editable">
                <button type="button" class="btn btn-sm" *ngIf="!edit" (click)="toggleEdit()">
                    <i class="fa fa-pencil"></i>{{'edit' | translate}}
                </button>
                <button type="button" class="btn btn-sm" title="{{'delete' | translate}}" (click)="delete.emit(comment)">
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
    @Input() editable: boolean = false;
    @Output() save = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();
    private saving: boolean = false;
    private edit: boolean = false;
    private commentText: string;

    private toggleEdit() {
        this.edit = this.editable && !this.edit;

        if (this.edit) {
            this.commentText = this.comment.comment;
        } else {
            this.commentText = '';
        }
    }

    private saveComment() {
        this.comment.comment = this.commentText;
        this.saving = true;
        this.save.emit(this.comment);
    }
}
