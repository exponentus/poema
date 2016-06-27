import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../models';

@Component({
    selector: 'user-select',
    template: 'user-select'
})

export class UserSelectComponent {
    @Input() customerId: string;
    @Output() onSelect: EventEmitter<any> = new EventEmitter();

}
