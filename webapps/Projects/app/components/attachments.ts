import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { UploadService } from '../services';
import { Attachment } from '../models';

@Component({
    selector: 'attachments',
    pipes: [TranslatePipe],
    host: {
        '[class.attachments]': 'true'
    },
    template: `
        <label class="btn btn-upload" title="{{'attach_file' | translate}}">
            <i class="fa fa-paperclip"></i>
            <span>{{'attach_file' | translate}}</span>
            <input type="file" (change)="uploadFile($event)" style="display:none;"/>
        </label>
        <div class="attach-list">
            <div class="attach-item" *ngFor="let att of entity.attachments">
                <a class="attach-name" href="{{entity.url}}&attachment={{att.id}}">
                    {{att.realFileName}}
                </a>
                <button class="btn btn-sm btn-link btn-remove" (click)="deleteAttach(att, $event)">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </div>
    `
})

export class AttachmentsComponent {
    @Input() entity: any;
    @Output() upload = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();

    constructor(
        private http: Http,
        private uploadService: UploadService
    ) { }

    uploadFile($event) {
        let files: File[] = $event.target.files;
        this.uploadService.makeFileRequest('UploadFile?time=' + Date.now(), { fsid: this.entity.fsid }, files).subscribe(response => {
            this.upload.emit(response);
        });
    }

    deleteAttach(att: Attachment, $event) {
        this.delete.emit(att);
    }
}
