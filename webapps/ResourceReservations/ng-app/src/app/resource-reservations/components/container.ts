import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'rr-container',
    template: `<router-outlet></router-outlet>`,
    styleUrls: [
        '../styles/style.css'
    ],
    host: {
        '[class.module-container]': 'true'
    },
    encapsulation: ViewEncapsulation.None
})
export class RRContainerComponent { }
