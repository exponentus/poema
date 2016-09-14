import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'acl',
    template: `
        <div class="fieldset">
            <div class="form-group">
                <div class="control-label">
                    {{'editors' | translate}}
                </div>
                <div class="controls">
                    <div class="input-placeholder">
                        <ul class="acl-list list-style-none">
                            <li class="acl-list-item" *ngFor="let editor of acl.editors | values">{{editor}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="control-label">
                    {{'readers' | translate}}
                </div>
                <div class="controls">
                    <div class="input-placeholder">
                        <ul class="acl-list list-style-none">
                            <li class="acl-list-item" *ngFor="let reader of acl.readers | values">{{reader}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class AclComponent {
    @Input() acl: any = {};
}
