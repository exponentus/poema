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
                <form><label class="btn btn-upload" data-upload="">
                    <i class="fa fa-paperclip"></i>
                    <span>{{'attach_file' | translate}}</span>
                    <input type="file" (change)="uploadFile($event)" style="display:none;"/>
                </label></form>
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
    @Output() upload = new EventEmitter<any>();

    constructor(
        private http: Http,
        private uploadService: UploadService
    ) { }

    uploadFile($event) {
        // http://localhost:38700/MunicipalProperty/UploadFile?time=1467570792479
        let files: File[] = $event.target.files;
        this.uploadService.makeFileRequest('UploadFile?time=1467570792479&fsid=1111', [], files).subscribe(r => {
            console.log(r);

            this.upload.emit({
                file: $event.target
            });
        });
    }
}
