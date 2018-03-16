import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'approver-decision-icon',
    template: `
        <div [ngSwitch]="approver.decisionType">
            <div *ngSwitchCase="'YES'" [title]="'approver_decision_yes' | translate">
                <i class="fa fa-check icon-approver-decision-yes"></i>
                <span *ngIf="label">{{'approver_decision_yes' | translate}}</span>
            </div>
            <div *ngSwitchCase="'NO'" [title]="'approver_decision_no' | translate">
                <i class="fa fa-times icon-approver-decision-no"></i>
                <span *ngIf="label">{{'approver_decision_no' | translate}}</span>
            </div>
            <div *ngSwitchCase="'SKIPPED'" [title]="'approver_decision_skipped' | translate">
                <i class="fa fa-circle-o icon-approver-decision-skipped"></i>
                <span *ngIf="label">{{'approver_decision_skipped' | translate}}</span>
            </div>
        </div>
    `,
    styles: [`
        approver-decision-icon {
            display: inline-block;
        }

        .icon-approver-decision-yes {
            color: green;
            margin: 0 3px;
        }

        .icon-approver-decision-no {
            color: red;
            margin: 0 3px;
        }

        .icon-approver-decision-skipped {
            color: gray;
            margin: 0 3px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ApproverDecisionIconComponent {
    @Input() approver: any;
    @Input() label: boolean = false;
}
