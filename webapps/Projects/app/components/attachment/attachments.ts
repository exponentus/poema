import { Component, Input, Output, EventEmitter, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { UploadService } from '../../services';
import { Attachment } from '../../models';

@Component({
    selector: 'attachments',
    template: `
        <label class="btn btn-upload" title="{{ 'attach_file' | translate }}">
            <i class="fa fa-paperclip"></i>
            <span>{{ 'attach_file' | translate }}</span>
            <input type="file" (change)="uploadFile($event.target.files)" style="display:none;"/>
        </label>
        <div class="attachment-list">
            <div class="attachment-list__item" *ngFor="let att of model.attachments">
                <div class="attachment">
                    <a class="attachment__link" href="{{model.url}}&attachment={{att.id}}">{{ att.realFileName }}</a>
                    <span class="attachment__size"></span>
                    <button type="button" class="btn btn-sm btn-link btn-remove" (click)="deleteAttach(att)">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
            </div>
        </div>
    `,
    providers: [UploadService],
    pipes: [TranslatePipe]
})

export class AttachmentsComponent {
    @HostBinding('class.attachments') true;
    @Input() model: any;
    @Output() upload = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();

    private sub: any;
    private progress: number = 0;

    constructor(
        private http: Http,
        private uploadService: UploadService
    ) { }

    ngOnInit() {
        this.sub = this.uploadService.progress$.subscribe(progress => {
            if (progress && progress < 100) {
                this.progress = progress;
            } else {
                this.progress = 0;
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    uploadFile(files: File[]) {
        this.uploadService.makeFileRequest('UploadFile?time=' + Date.now(), { fsid: this.model.fsid }, files).subscribe(response => {
            this.upload.emit(response);
        });
    }

    deleteAttach(attachment: Attachment) {
        this.delete.emit(attachment);
    }
}
