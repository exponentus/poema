import { Component, Input } from '@angular/core';

@Component({
    selector: 'task-approval',
    templateUrl: './approval.html',
    styleUrls: ['./approval.css']
})
export class ApprovalComponent {
    @Input() blocks: any[];
}
