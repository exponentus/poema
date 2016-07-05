import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { UploadService } from '../services';
import { Attachment } from '../models';

@Component({
    selector: 'attachments',
    pipes: [TranslatePipe],
    host: {},
    template: `
        <div class="attachments fieldset">
            <legend class="legend">
                {{'attachments' | translate}}
            </legend>
            <div class="form-group">
                <label class="btn btn-upload" data-upload="">
                    <i class="fa fa-paperclip"></i>
                    <span>{{'attach_file' | translate}}</span>
                    <input type="file" (change)="uploadFile($event)" style="display:none;"/>
                </label>
                <div class="attachments" data-upload-files="">
                    <div class="attachments-file" *ngFor="let att of attachments">
                        <a class="file-name" href="{{att.url}}">
                            {{att.realFileName}}
                        </a>
                        <span class="btn btn-sm btn-link btn-remove-file on-edit">
                            <i class="fa fa-times"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class AttachmentsComponent {
    @Input() attachments: Attachment[];
    @Input() fsId: string;
    @Output() upload = new EventEmitter<any>();
    @Output() remove = new EventEmitter<any>();

    constructor(
        private http: Http,
        private uploadService: UploadService
    ) { }

    uploadFile($event) {
        let files: File[] = $event.target.files;
        this.uploadService.makeFileRequest('UploadFile?time=' + Date.now(), { fsid: this.fsId }, files).subscribe(response => {
            this.upload.emit(response);
        });
    }
}
