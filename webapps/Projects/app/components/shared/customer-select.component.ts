import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Organization } from '../../models';

@Component({
    selector: 'customer-select',
    template: 'customer-select'
})

export class CustomerSelectComponent {
    @Input() customerId: string;
    @Output() onSelect: EventEmitter<any> = new EventEmitter();

}
