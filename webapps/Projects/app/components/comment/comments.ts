import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { MarkdownEditorComponent } from '../../shared/markdown/markdown-editor';
import { NotificationService } from '../../shared/notification';
import { PaginationComponent } from '../../shared/pagination';
import { Task, Comment } from '../../models';
import { TaskService } from '../../services';
import { ITaskState } from '../../reducers/task.reducer';
import { CommentComponent } from './comment';

@Component({
    selector: 'comments',
    template: `
        <div class="comments-wrap">
            <section class="comments">
                <comment *ngFor="let comment of comments"
                    [comment]="comment"
                    (delete)="deleteComment($event)">
                </comment>
            </section>
            <markdown-editor></markdown-editor>
            <section class="comment-composer" [class.edit]="isEdit">
                <textarea
                    class="comment-editor"
                    placeholder="{{ 'add_comment' | translate }}"
                    [(ngModel)]="commentText"
                    (focus)="onCommentTextFocus()"
                    (blur)="onCommentTextBlur()">
                </textarea>
                <div class="buttons">
                    <button class="btn btn-add-comment"
                        (click)="addComment($event)"
                        [disabled]="!commentText">
                        {{ 'add_comment' | translate }}
                    </button>
                </div>
            </section>
        </div>
    `,
    directives: [PaginationComponent, CommentComponent, MarkdownEditorComponent],
    pipes: [TranslatePipe]
})

export class CommentsComponent {
    @Input() comments: Comment[];
    @Output() add = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();

    private comment: Comment;
    private commentText: string = '';
    private isEdit: boolean;

    onCommentTextFocus() {
        this.isEdit = true;
    }

    onCommentTextBlur() {
        this.isEdit = this.commentText.length > 0;
    }

    addComment($event) {
        let comment = new Comment();
        comment.comment = this.commentText;
        this.add.emit(comment);
        this.commentText = '';
    }

    deleteComment(comment: Comment) {
        this.delete.emit(comment);
    }
}
