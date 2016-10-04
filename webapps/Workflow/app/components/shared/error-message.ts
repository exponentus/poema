import { Component, Input } from '@angular/core';

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
    }
})

export class ErrorMessageComponent {
    @Input() error: any = {};

    constructor() { }
}
