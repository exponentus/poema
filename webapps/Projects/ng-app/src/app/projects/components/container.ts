import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'projects-container',
    template: `
        <router-outlet></router-outlet>
    `,
    styleUrls: [
        '../styles/request.css',
        '../styles/style.css',
        '../styles/task.css'
    ],
    host: {
        '[class.module-container]': 'true'
    },
    encapsulation: ViewEncapsulation.None
})
export class ProjectsContainerComponent { }
