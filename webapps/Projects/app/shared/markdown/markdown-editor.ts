import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MarkdownConverter } from './markdown-converter';

@Component({
    selector: 'markdown-editor',
    template: `
        <div class="rt-editor {{klass}}" [class.edit]="editable">
            <div class="rt-editor__placeholder" *ngIf="placeHolder && !hasValue">{{placeHolder}}</div>
            <div class="rt-editor__area"
                [contentEditable]="editable"
                (keyup)="updateValue($event.target)"
                (focus)="focus.emit($event)"
                (blur)="blur.emit($event)"
                innerHTML="{{html}}">
            </div>
        </div>
    `
})

export class MarkdownEditorComponent {
    @Input() editable: boolean = true;
    @Input() markdown: string = '';
    @Input() klass: string = '';
    @Input() placeHolder: string;
    @Input() updateTimeout: number = 150;

    @Output() update = new EventEmitter<any>();
    @Output() focus = new EventEmitter<any>();
    @Output() blur = new EventEmitter<any>();

    private hasValue: boolean = false;
    private html: string;
    private to: any;

    constructor(private mdc: MarkdownConverter) { }

    ngOnInit() {
        this.html = this.mdc.toHtml(this.markdown);
        this.hasValue = this.markdown.length > 0;
    }

    updateValue($el) {
        this.hasValue = $el.innerText.trim().length > 0;
        clearTimeout(this.to);
        this.to = setTimeout(() => {
            this.update.emit(this.mdc.toMarkdown($el.innerHTML));
        }, this.updateTimeout);
    }
}
