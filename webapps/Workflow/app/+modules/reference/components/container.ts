import { Component } from '@angular/core';

@Component({
    selector: 'reference-container',
    template: `
        <nav class="aside side-nav"
            nb-nav
            rootSegment="/reference/view"
            outlineUrl="/Reference/p?id=outline">
        </nav>
        <main class="content">
            <router-outlet></router-outlet>
        </main>
    `
})

export class ReferenceContainerComponent { }
