import { Component } from '@angular/core';

@Component({
    selector: 'projects-container',
    template: `
        <nav class="aside side-nav" projects-nav></nav>
        <main class="content">
            <router-outlet></router-outlet>
        </main>
    `
})

export class ProjectsContainerComponent { }
