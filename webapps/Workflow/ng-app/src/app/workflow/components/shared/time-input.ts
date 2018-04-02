import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'nb-time-input',
    template: `
        <select (change)="change.emit($event.target.value)">
            <option value="" *ngFor="let m of minutes"></option>
        </select>
    `
})
export class TimeInputComponent {
    @Input() minutes: number[] = [
        30, // 30 minute
        60, // 1 hour
        60 * 3,
        60 * 6,
        60 * 24,
        60 * 24 * 3,
        60 * 24 * 7
    ];
    @Output() change = new EventEmitter<number>();

    // нет, 30 минут, 1 час, 3 часа, 6 часов, 1 день, 3 дня , 1 неделя

}
