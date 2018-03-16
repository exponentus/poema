import { Component, Input } from '@angular/core';

interface ITimeLine {
    [date: string]: string;
}

@Component({
    selector: 'task-status',
    templateUrl: './task-status.html'
})
export class TaskStatusComponent {
    @Input() status: string;
    @Input('history') set _timeLine(timeLine: any) {
        this.history = Object.assign({}, timeLine.stages); // timeLine.approvalStages,
    }

    history: ITimeLine;
}
