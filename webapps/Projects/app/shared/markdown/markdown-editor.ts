import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const marked = require('marked');
const toMarkdown = require('to-markdown');

@Component({
    selector: 'markdown-editor',
    template: `
        <div class="rt-editor">
            <div class="rt-editor__area {{klass}}" [class.edit]="editable" contenteditable="true"
                innerHtml="{{html}}"
                (keyup)="updateValue($event.target)"
                (focus)="focus.emit(1)"
                (blur)="blur.emit(1)">
            </div>
            <!-- <span class="rt-editor__placeholder" *ngIf="!html.length">{{placeHolder}}</span> -->
        </div>
    `
})

export class MarkdownEditorComponent {
    @Input() editable: boolean = true;
    @Input() markdown: string = '';
    @Input() klass: string = '';
    @Input() placeHolder: string;

    @Output() update = new EventEmitter<any>();
    @Output() focus = new EventEmitter<any>();
    @Output() blur = new EventEmitter<any>();

    private html: string;

    ngOnInit() {
        this.html = marked(this.markdown);
    }

    updateValue($el) {
        this.update.emit(toMarkdown($el.innerHTML));
    }
}
