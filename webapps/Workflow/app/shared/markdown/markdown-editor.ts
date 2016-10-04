import { Component, OnInit, Input, Output, EventEmitter, HostBinding, ElementRef, ViewChild, Renderer } from '@angular/core';

import { MarkdownConverter } from './markdown-converter';

@Component({
    selector: 'markdown-editor',
    template: `
        <div class="md-editor-container">
            <div class="md-editor__tabs" [class.md-active]="isMdMode" [class.preview-active]="isPreviewMode">
                <div class="md-editor__placeholder" *ngIf="placeHolder">{{placeHolder}}</div>
                <div class="md-editor__tab-title-md" *ngIf="editable" (click)="setActiveMdMode()">
                    {{writeLabel}}
                    <a class="md-editor-site" href="https://daringfireball.net/projects/markdown/syntax" tabindex="-1" (click)="false" title="Markdown" target="blank" rel="noreferrer">
                        <img height="14px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUCAYAAAGblg/ZAAAACXBIWXMAAAsSAAALEgHS3X78AAAAFXpUWHRBdXRob3IAAAiZy01NycwDAAYmAg7P7sJVAAABUklEQVRIx2NgYGAwAuL/SBhCwAAjmsB6RmwqYOA/Ni0MyIYuQGKj0MicB1D2YZgYyMh/aHYhg6sMuIyFeYwJh4vhAFmBMJocK05voQcEPkcSBf5jseUrEGvhUYMRe8iSyTgsQQcxuAz4j0fMHMr/i6zmCpomUjFFBhgSjCZCAD2lIEfnQixijNiiHD3AtKDRyEBMNCJ7gZFAWkFW8x+bF9BBClqcM+LKGOjOewDNGOhOZkbin8CXEnElpN9QtiOupEwMno8uRmk6uESNpEwJvkKpD5ANY6aGIdgcwwUtfWHyV6FipJqDNRSwhQCuDJGAVMEwEFHmMRJRJjKQ4gBiQpJkBzARYfB3IDZG4psA8Q8caj8CsSIOT4DElIH4M7lxtwOIdxIZx7VY5NtwVQhkJR4kXzFBcwC6/B0g5gFiISB+QkoipCtggjbSrg6A3aBS0AAACVPtjHPTRNQAAAAASUVORK5CYII=" alt="md" />
                    </a>
                </div>
                <div class="md-editor__tab-title-preview" *ngIf="editable" (click)="setActivePreviewMode()">{{previewLabel}}</div>
                <div class="md-editor__btn-split-mode" *ngIf="editable" (click)="toggleSplitMode()">
                    <i class="fa fa-columns"></i>
                </div>
                <div class="md-editor__btn-fullscreen" *ngIf="editable" (click)="toggleFullscreen()">
                    <i class="fa fa-expand"></i>
                </div>
                <div class="md-editor__btn-help" *ngIf="editable" (click)="toggleHelp()">
                    <i class="fa fa-question"></i>
                </div>
                <div class="md-editor__tab-content">
                    <div class="md-editor__markdown" *ngIf="editable">
                        <textarea class="md-editor__area"
                            #mdTextArea
                            name="md"
                            rows="3"
                            autosize
                            (keyup)="updateValue($event.target.value)"
                            (focus)="focus.emit($event)"
                            (blur)="updateValue($event.target.value)">{{_markdown}}</textarea>
                        <!-- <div class="md-editor__area" tabindex="0" draggable="false"
                            #mdTextArea
                            [contentEditable]="editable"
                            (drop)="false"
                            (keyup)="updateValue($event.target)"
                            (focus)="focus.emit($event)"
                            (blur)="updateValue($event.target)"
                            innerHTML="{{_markdown}}">
                        </div> -->
                    </div>
                    <div class="md-editor__preview" innerHTML="{{html}}"></div>
                </div>
            </div>
            <div class="md-editor__help" [class.show]="helpVisible">
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
                    <!-- <div class="md-editor__help-item">
                        <div class="md-editor__help-item-md">
                            &gt; blockquote<br/>&gt; Abc<br/>&gt; 123<br/>
                        </div>
                        <div class="md-editor__help-item-html">
                            <blockquote>
                                <p>blockquote<br>Abc<br>123</p>
                            </blockquote>
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
                    </div> -->
                    <div class="md-editor__help-item">
                        [link](http://google.com)<br/>
                        <a href="http://google.com">link</a>
                    </div>
                </div>
            </div>
        </div>
    `,
    host: {
        'tabindex': '-1',
        '(keyup.esc)': 'onEsc($event)'
    }
})

export class MarkdownEditorComponent {
    @HostBinding('class.md-editor') true;
    @HostBinding('class.edit') get _edit() { return this.editable; };
    @HostBinding('class.fullscreen') get _fullscreen() { return this.fullscreen; };
    @HostBinding('class.split-mode') get _splitMode() { return this.splitMode; };
    @HostBinding('class.help-is-visible') get _helpVisible() { return this.helpVisible; };
    @HostBinding('class.has-value') get _hasValue() { return this.hasValue; };

    @Input() editable: boolean = true;
    @Input() markdown: string = '';
    @Input() placeHolder: string;
    @Input() updateTimeout: number = 150;
    @Input() writeLabel: string = 'Write';
    @Input() previewLabel: string = 'Preview';

    @Output() update = new EventEmitter<any>();
    @Output() focus = new EventEmitter<any>();
    @Output() blur = new EventEmitter<any>();
    @Output() onFullscreen = new EventEmitter<any>();

    @ViewChild('mdTextArea') mdTextArea: ElementRef;

    private fullscreen: boolean = false;
    private splitMode: boolean = false;
    private hasValue: boolean = false;
    private html: string;
    private timeout: any;

    private _markdown: string;
    private isMdMode: boolean = true;
    private isPreviewMode: boolean = false;
    private helpVisible: boolean = false;

    constructor(
        private renderer: Renderer,
        private mdc: MarkdownConverter
    ) { }

    ngOnInit() {
        this.html = this.mdc.toHtml(this.markdown);
        this.hasValue = this.markdown.length > 0;
        this._markdown = this.markdown;

        if (this.editable) {
            this.setActiveMdMode();
        } else {
            this.setActivePreviewMode();
        }
    }

    onEsc($event) {
        $event.preventDefault();
        if (this.fullscreen) {
            this.toggleFullscreen();
        }
    }

    focusMdTextArea() {
        if (this.mdTextArea) {
            setTimeout(() => {
                this.renderer.invokeElementMethod(this.mdTextArea.nativeElement, 'focus');
            }, 0);
        }
    }

    setActiveMdMode() {
        this.isMdMode = true;
        this.isPreviewMode = false;
        this.splitMode = false;
        this.focusMdTextArea();
    }

    setActivePreviewMode() {
        this.isPreviewMode = true;
        this.isMdMode = false;
        this.splitMode = false;
    }

    toggleFullscreen() {
        this.fullscreen = !this.fullscreen;
        this.onFullscreen.emit(this.fullscreen);
        this.focusMdTextArea();
    }

    toggleSplitMode() {
        this.splitMode = !this.splitMode;
        this.isMdMode = this.splitMode !== true;
        this.isPreviewMode = false;
        this.focusMdTextArea();
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
