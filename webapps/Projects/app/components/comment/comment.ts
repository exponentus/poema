import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { DateFormatPipe } from '../../pipes';
import { Comment } from '../../models';

@Component({
    selector: 'comment',
    template: `
        <div class="comment-wrap">
            <span class="comment-author">{{ comment.author }}</span>
            <span class="comment-time">{{ comment.regDate }}</span>
            <p class="comment-text">{{ comment.comment }}</p>
        </div>
    `,
    pipes: [DateFormatPipe, TranslatePipe]
})

export class CommentComponent {
    @Input() comment: Comment;

    constructor() { }
}
