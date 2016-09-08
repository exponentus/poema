import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MarkdownConverter } from './markdown-converter';

@Component({
    selector: 'markdown-editor',
    template: `
        <div class="md-editor-container">
            <div class="md-editor__tabs" [class.md-active]="isMdMode" [class.preview-active]="isPreviewMode">
                <div class="md-editor__placeholder" *ngIf="placeHolder">{{placeHolder}}</div>
                <div class="md-editor__tab-title-md" *ngIf="editable" (click)="setActiveMdMode()">{{writeLabel}}</div>
                <div class="md-editor__tab-title-preview" *ngIf="editable" (click)="setActivePreviewMode()">{{previewLabel}}</div>
                <!-- <div class="md-editor__btn-fullscreen" *ngIf="editable" (click)="toggleFullscreen()">
                    <i class="fa fa-expand"></i>
                </div> -->
                <div class="md-editor__btn-split-mode" *ngIf="editable" (click)="toggleSplitMode()">
                    <i class="fa fa-columns"></i>
                </div>
                <div class="md-editor__btn-help" *ngIf="editable" (click)="toggleHelp()">
                    <i class="fa fa-question"></i>
                </div>
                <div class="md-editor__tab-content">
                    <div class="md-editor__markdown" *ngIf="editable">
                        <textarea class="md-editor__area"
                            name="md"
                            value="{{_markdown}}"
                            (keyup)="updateValue($event.target.value)"
                            (focus)="focus.emit($event)"
                            (blur)="updateValue($event.target.value)"></textarea>
                        <!-- <div class="md-editor__area"
                            [contentEditable]="editable"
                            (keyup)="updateValue($event.target)"
                            (focus)="focus.emit($event)"
                            (blur)="blur.emit($event)"
                            innerHTML="{{html}}">
                        </div> -->
                    </div>
                    <div class="md-editor__preview" innerHTML="{{html}}"></div>
                </div>
            </div>
            <div class="md-editor__help" [class.show]="helpVisible">
                <a href="https://daringfireball.net/projects/markdown/basics" target="blank" rel="noreferrer">Markdown</a>
                <a href="https://en.wikipedia.org/wiki/Markdown" target="blank" rel="noreferrer">wiki/Markdown</a>
                <div class="md-editor__help-list">
                    <div class="md-editor__help-item">
                        <h1 class="md-editor__help-item-h"># H1</h1>
                        <h2 class="md-editor__help-item-h">## H2</h2>
                        <h3 class="md-editor__help-item-h">### H3</h3>
                    </div>
                    <div class="md-editor__help-item">
                        <em>_italic_</em><br/>
                        <em>*italic*</em><br/>
                        <strong>__bold__</strong><br/>
                        <strong>**bold**</strong><br/>
                        <code>\`monospace\`</code>
                    </div>
                    <div class="md-editor__help-item">
                        ---
                        <hr/>
                    </div>
                    <div class="md-editor__help-item">
                        <div class="md-editor__help-item-md">
                            - 1<br/>- 2<br/>- 3
                        </div>
                        <div class="md-editor__help-item-html">
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div class="md-editor__help-item">
                        <div class="md-editor__help-item-md">
                            1. n1<br/>2. n2<br/>3. n3
                        </div>
                        <div class="md-editor__help-item-html">
                            <ol>
                                <li>n1</li>
                                <li>n2</li>
                                <li>n3</li>
                            </ol>
                        </div>
                    </div>
                    <div class="md-editor__help-item">
                        [link](http://google.com)<br/>
                        <a href="http://google.com">link</a>
                    </div>
                </div>
            </div>
        </div>
    `,
    host: {
        '[class.md-editor]': 'true',
        '[class.edit]': 'editable',
        '[class.fullscreen]': 'fullscreen',
        '[class.split-mode]': 'splitMode',
        '[class.has-value]': 'hasValue'
    }
})

export class MarkdownEditorComponent {
    @Input() editable: boolean = true;
    @Input() markdown: string = '';
    @Input() placeHolder: string;
    @Input() updateTimeout: number = 150;
    @Input() writeLabel: string = 'Write';
    @Input() previewLabel: string = 'Preview';

    @Output() update = new EventEmitter<any>();
    @Output() focus = new EventEmitter<any>();
    @Output() blur = new EventEmitter<any>();

    private fullscreen: boolean = false;
    private splitMode: boolean = false;
    private hasValue: boolean = false;
    private html: string;
    private timeout: any;

    private _markdown: string;
    private isMdMode: boolean = false;
    private isPreviewMode: boolean = true;
    private helpVisible: boolean = false;

    constructor(private mdc: MarkdownConverter) { }

    ngOnInit() {
        this.html = this.mdc.toHtml(this.markdown);
        this.hasValue = this.markdown.length > 0;
        this._markdown = this.markdown;

        if (this.editable && !this.markdown.trim().length) {
            this.setActiveMdMode();
        }
    }

    setActiveMdMode() {
        this.isMdMode = true;
        this.isPreviewMode = false;
        this.splitMode = false;
    }

    setActivePreviewMode() {
        this.isPreviewMode = true;
        this.isMdMode = false;
        this.splitMode = false;
    }

    toggleFullscreen() {
        this.fullscreen = !this.fullscreen;
    }

    toggleSplitMode() {
        this.splitMode = !this.splitMode;
        this.isMdMode = this.splitMode !== true;
        this.isPreviewMode = false;
    }

    toggleHelp() {
        this.helpVisible = !this.helpVisible;
    }

    updateValue(value: string) {
        clearTimeout(this.timeout);
        this.hasValue = value.trim().length > 0;
        this.timeout = setTimeout(() => {
            this.update.emit(value.trim());
            this.html = this.mdc.toHtml(value.trim());
        }, this.updateTimeout);
    }
}
