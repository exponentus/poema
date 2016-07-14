import { Pipe } from '@angular/core';
import { MarkdownConverter } from './markdown-converter';

@Pipe({ name: 'marked' })
export class MarkedPipe {
    constructor(private mdc: MarkdownConverter) { }

    transform(text: string): string {
        return this.mdc.toHtml(text);
    }
}
