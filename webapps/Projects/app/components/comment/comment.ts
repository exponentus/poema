import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { Comment } from '../../models';

@Component({
    selector: 'comment',
    template: `
        <div class="comment" [class.edit]="edit" [class.saving]="saving">
            <div class="comment__avatar"></div>
            <div class="comment__details">
                <span class="comment__author">
                    <!-- <employee-input [editable]="false" [ids]="[comment.authorId]"></employee-input> -->
                </span>
                <span class="comment__time">{{comment.regDate}}</span>
                <p class="comment__text" *ngIf="!edit" innerHTML="{{comment.comment | marked}}"></p>
                <div class="comment__editor" *ngIf="edit">
                    <markdown-editor
                        markdown="{{comment.comment}}"
                        editable="true"
                        placeHolder="{{'add_comment' | translate}}"
                        (update)="setCommentText($event)">
                    </markdown-editor>
                    <button type="button" class="btn btn-cancel" [disabled]="saving" (click)="toggleEdit()">{{'cancel' | translate}}</button>
                    <button type="button" class="btn btn-primary btn-save" [disabled]="saving" (click)="saveComment()">{{'save' | translate}}</button>
                </div>
                <!-- <attachments
                    [model]="comment"
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
    `
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

    private setCommentText(text: string) {
        this.commentText = text;
    }

    private saveComment() {
        this.comment.comment = this.commentText;
        this.saving = true;
        this.save.emit(this.comment);
    }
}
