import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { DateFormatPipe } from '../../pipes';
import { Comment } from '../../models';

@Component({
    selector: 'comment',
    template: `
        {{ comment.comment }}
        {{ comment.attachments }}
    `,
    host: {
        'class.comment': 'true'
    },
    directives: [],
    pipes: [DateFormatPipe, TranslatePipe]
})

export class CommentComponent {
    @Input() comment: Comment;

    constructor() { }
}
