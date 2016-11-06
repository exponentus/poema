import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'request-decline-dialog',
    template: `
        <div class="dialog__container">
            <header class="dialog__head">{{'decline' | translate}}?</header>
            <section class="dialog__body">
                <textarea name="comment" placeholder="{{'decline_reason' | translate}}" [(ngModel)]="comment"></textarea>
            </section>
            <footer class="dialog__footer">
                <button type="button" class="btn" (click)="cancel.emit(true)">
                    {{'cancel' | translate}}
                </button>
                <button type="button" class="btn btn-primary" (click)="confirm.emit(comment)">
                    {{'decline' | translate}}
                </button>
            </footer>
        </div>
    `,
    host: {
        '[class.task-cancel-dialog]': 'true',
        '[class.nb-dialog]': 'true'
    }
})

export class RequestDeclineDialogComponent {
    @Output() confirm = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<any>();

    private comment: string;
}
