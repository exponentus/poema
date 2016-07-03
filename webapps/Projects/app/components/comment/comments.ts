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
    loading: boolean = true;

    constructor(
        private store: Store<any>,
        private taskService: TaskService,
        private notifyService: NotificationService
    ) { }

    ngOnInit() {
        this.loadComments(1);
    }

    loadComments(page) {
        this.loading = true;
        this.taskService.fetchComments(this.task, page).subscribe((data: any) => {
            if (data) {
                this.comments = data.comments;
                this.meta = data.meta;
                this.loading = false;
            }
        });
    }

    newComment() {
        this.comment = new Comment();
    }

    addComment($event) {
        this.taskService.addComment(this.task, this.comment);
    }

    deleteComment() {

    }
}
