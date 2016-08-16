import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { CommentComponent } from './comment';
import { NotificationService } from '../../shared/notification';
import { TaskService } from '../../services';
import { ITaskState } from '../../reducers/task.reducer';
import { Task, Comment } from '../../models';

@Component({
    selector: 'comments',
    template: `
        <div class="comments-wrap">
            <section class="comments">
                <comment *ngFor="let comment of comments"
                    [comment]="comment"
                    [editable]="true"
                    (save)="updateComment($event)"
                    (delete)="deleteComment($event)">
                </comment>
            </section>
            <section class="comment-composer" [class.edit]="isEdit">
                <div class="comment-composer__editor">
                    <markdown-editor
                        editable="true"
                        placeHolder="{{'comment' | translate}}"
                        (update)="setCommentText($event)"
                        (focus)="onEditorFocus($event)"
                        (blur)="onEditorBlur($event)">
                    </markdown-editor>
                </div>
                <button class="btn btn-add-comment"
                    (click)="addComment()"
                    [disabled]="!commentText">
                    {{'add_comment' | translate}}
                </button>
            </section>
        </div>
    `,
    directives: [CommentComponent]
})

export class CommentsComponent {
    @Input() comments: Comment[];
    @Output() add = new EventEmitter<any>();
    @Output() update = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();

    private comment: Comment;
    private commentText: string = '';
    private isEdit: boolean;

    onEditorFocus() {
        this.isEdit = true;
    }

    onEditorBlur() {
        this.isEdit = this.commentText.length > 0;
    }

    setCommentText(text: string) {
        this.commentText = text;
    }

    addComment() {
        let comment = new Comment();
        comment.comment = this.commentText;
        this.add.emit(comment);
        this.commentText = '';
    }

    updateComment(comment: Comment) {
        this.update.emit(comment);
    }

    deleteComment(comment: Comment) {
        this.delete.emit(comment);
    }
}
