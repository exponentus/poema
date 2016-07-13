import { Pipe } from '@angular/core';
const marked = require('marked');

@Pipe({ name: 'marked' })
export class MarkedPipe {
    transform(text: string): string {
        return marked(text);
    }
}
