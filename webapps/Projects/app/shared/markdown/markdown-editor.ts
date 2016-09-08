import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MarkdownConverter } from './markdown-converter';

@Component({
    selector: 'markdown-editor',
    template: `
        <div class="md-editor-container">
            <div class="md-editor__tabs" [class.md-active]="isMdMode" [class.preview-active]="isPreviewMode">
                <div class="md-editor__placeholder" *ngIf="placeHolder">{{placeHolder}}</div>
                <div class="md-editor__tab-title-md" *ngIf="editable" (click)="setActiveMdMode()">MARKDOWN</div>
                <div class="md-editor__tab-title-preview" *ngIf="editable" (click)="setActivePreviewMode()">PREVIEW</div>
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
                    <div class="md-editor__preview" [innerHTML]="html"></div>
                </div>
            </div>
            <div class="md-editor__help" [class.show]="helpVisible">
                <ul>
                    <li></li>
                </ul>
                # H1
                ## H2
                ### H3
                #### H4
                **bold**
                _italic_
                > quote

                \`code\`

                - list1
                - list2


                1. numeric list1
                2. numeric list2

                [link text](google.com)

                | table caption1 | c2 |
                | ---  | --- |
                | 1.1 | 1.2 |
                | 2.1 | 2.2 |
                | 3.1 | 3.2 |
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
