import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'tab',
    template: `
      <div [hidden]="!active && !pinned">
        <ng-content></ng-content>
      </div>
    `
})

export class Tab {
    @Input('tabTitle') title: string;
    @Input() active: boolean = false;
    @Input() pinned: boolean = false;
    @Output() select = new EventEmitter<any>();
}
