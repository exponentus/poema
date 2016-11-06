import { Injectable } from '@angular/core';

const marked = require('marked');
const toMarkdown = require('to-markdown');

@Injectable()
export class MarkdownConverter {

    constructor() {
        marked.setOptions({
            gfm: true,
            tables: true,
            breaks: true
        });
    }

    toMarkdown(html) {
        return toMarkdown(html, { gfm: true });
    }

    toHtml(markdown) {
        return marked(markdown);
    }
}
