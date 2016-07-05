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
    template: require('./comments.html'),
    directives: [PaginationComponent, CommentComponent],
    pipes: [TranslatePipe]
})

export class CommentsComponent {
    @Input() task: Task;
    comment: Comment;
    comments: Comment[];
    meta: any;
    commentText: string;

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
