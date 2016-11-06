import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'task-cancel-dialog',
    template: `
        <div class="dialog__container">
            <header class="dialog__head">{{'cancel_task' | translate}}?</header>
            <section class="dialog__body">
                <textarea name="comment" placeholder="{{'cancel_reason' | translate}}" [(ngModel)]="comment"></textarea>
            </section>
            <footer class="dialog__footer">
                <button type="button" class="btn" (click)="cancel.emit(true)">
                    {{'close' | translate}}
                </button>
                <button type="button" class="btn btn-primary" (click)="confirm.emit(comment)">
                    {{'cancel_task' | translate}}
                </button>
            </footer>
        </div>
    `,
    host: {
        '[class.task-cancel-dialog]': 'true',
        '[class.nb-dialog]': 'true'
    }
})

export class TaskCancelDialogComponent {
    @Output() confirm = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<any>();

    private comment: string;
}
