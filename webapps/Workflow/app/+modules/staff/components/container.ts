import { Component } from '@angular/core';

@Component({
    selector: 'staff-container',
    template: `
        <nav class="aside side-nav"
            nb-nav
            rootSegment="/staff"
            outlineUrl="/Staff/p?id=outline">
        </nav>
        <main class="content">
            <router-outlet></router-outlet>
        </main>
    `
})

export class StaffContainerComponent { }
