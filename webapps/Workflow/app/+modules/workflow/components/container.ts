import { Component } from '@angular/core';

@Component({
    selector: 'workflow-container',
    template: `
        <nav class="aside side-nav"
            nb-nav
            rootSegment="/workflow"
            outlineUrl="/Workflow/p?id=outline">
        </nav>
        <main class="content">
            <router-outlet></router-outlet>
        </main>
    `
})

export class WorkflowContainerComponent { }
