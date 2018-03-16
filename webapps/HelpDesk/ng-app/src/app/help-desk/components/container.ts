import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'help-desk-container',
    template: `<router-outlet></router-outlet>`,
    host: {
        '[class.module-container]': 'true'
    },
    encapsulation: ViewEncapsulation.None
})
export class HelpDeskContainerComponent { }
