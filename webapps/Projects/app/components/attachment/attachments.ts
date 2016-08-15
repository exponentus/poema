import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { UploadService } from '../../services';
import { Attachment } from '../../models';

@Component({
    selector: 'attachments',
    template: `
        <div class="attachments">
            <i class="fa fa-paperclip" *ngIf="!editable"></i>
            <label class="btn btn-upload" title="{{'attach_file' | translate}}" *ngIf="editable">
                <i class="fa fa-paperclip"></i>
                <span>{{ 'attach_file' | translate }}</span>
                <input type="file" (change)="uploadFile($event.target.files)" style="display:none;"/>
            </label>
            <div class="attachment-list" *ngIf="!isHidden">
                <div class="attachment-list__item" *ngFor="let att of model.attachments">
                    <div class="attachment">
                        <a class="attachment__link" href="{{model.url}}&attachment={{att.id}}">{{ att.realFileName }}</a>
                        <span class="attachment__size"></span>
                        <button type="button" class="btn btn-sm btn-link btn-remove" *ngIf="editable" (click)="delete.emit(att)">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    providers: [UploadService],
    host: {
        '[class.hidden]': 'isHidden'
    }
})

export class AttachmentsComponent {
    @Input() model: any;
    @Input() editable: boolean = false;
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

    get isHidden() {
        return !this.editable && !this.model.attachments;
    }

    uploadFile(files: File[]) {
        this.uploadService.makeFileRequest('UploadFile?time=' + Date.now(), { fsid: this.model.fsid }, files).subscribe(response => {
            this.upload.emit(response);
        });
    }
}
