import { Component, Input } from '@angular/core';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

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
                <button type="button" class="btn btn-upload" data-upload="">
                    <i class="fa fa-paperclip"></i>
                    <span>{{'attach_file' | translate}}</span>
                </button>
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
}
