import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { PaginationComponent } from '../../shared/pagination';
import { Task, Comment } from '../../models';
import { TaskService } from '../../services';
import { CommentComponent } from './comment';

@Component({
    selector: 'comments',
    template: `
        <div class="comments-wrap">
            <section class="comments">
                <comment [comment]="comment" *ngFor="let comment of comments"></comment>
            </section>
            <section class="comment-composer" [class.edit]="isEdit">
                <textarea
                    class="comment-editor"
                    placeholder="{{ 'add_comment' | translate }}"
                    [(ngModel)]="commentText"
                    (focus)="onCommentTextFocus($event)"
                    (blur)="onCommentTextBlur($event)">
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
    directives: [PaginationComponent, CommentComponent],
    pipes: [TranslatePipe]
})

export class CommentsComponent {
    @Input() task: Task;
    comment: Comment;
    comments: Comment[];
    meta: any;
    commentText: string = '';
    isEdit: boolean;

    constructor(
        private store: Store<any>,
        private taskService: TaskService,
        private notifyService: NotificationService
    ) { }

    ngOnInit() {
        this.loadComments(1);
    }

    loadComments(page) {
        this.taskService.fetchComments(this.task, page).subscribe((data: any) => {
            if (data) {
                this.comments = data.list;
                this.meta = data.meta;
            }
        });
    }

    onCommentTextFocus($event) {
        this.isEdit = true;
    }

    onCommentTextBlur($event) {
        this.isEdit = this.commentText.length > 0;
    }

    addComment($event) {
        console.log(this.commentText);
        this.comment = new Comment();
        this.comment.comment = this.commentText;
        this.taskService.addComment(this.task, this.comment).subscribe(r => {
            this.loadComments(1);
            this.commentText = '';
        });
    }

    deleteComment() {

    }
}
