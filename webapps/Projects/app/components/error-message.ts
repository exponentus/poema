import { Component, Input } from '@angular/core';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

@Component({
    selector: 'error-message',
    template: `
        <div class="error-message__message" *ngIf="error">
            {{error.message | translate}}
        </div>
    `,
    host: {
        '[class.error-message]': 'true',
        '[class.show]': 'error'
    },
    pipes: [TranslatePipe]
})

export class ErrorMessageComponent {
    @Input() error: any = {};

    constructor() { }
}
