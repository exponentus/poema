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
                    [editable]="true"
                    (save)="updateComment($event)"
                    (delete)="deleteComment($event)">
                </comment>
            </section>
            <section class="comment-composer" [class.edit]="isEdit">
                <markdown-editor
                    markdown=""
                    editable="true"
                    klass="comment-editor"
                    placeHolder="{{'add_comment' | translate}}"
                    (update)="updateMDContent($event)"
                    (focus)="onEditorFocus($event)"
                    (blur)="onEditorBlur($event)">
                </markdown-editor>
                <!-- <textarea
                    class="comment-editor"
                    placeholder="{{'add_comment' | translate}}"
                    [(ngModel)]="commentText"
                    (focus)="onEditorFocus()"
                    (blur)="onEditorBlur()">
                </textarea> -->
                <button class="btn btn-add-comment"
                    (click)="addComment()"
                    [disabled]="!commentText">
                    {{ 'add_comment' | translate }}
                </button>
            </section>
        </div>
    `,
    directives: [PaginationComponent, CommentComponent, MarkdownEditorComponent],
    pipes: [TranslatePipe]
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

    updateMDContent(text: string) {
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
