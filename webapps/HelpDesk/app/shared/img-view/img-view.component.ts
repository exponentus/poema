import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { ImgViewService } from './img-view.service';

@Component({
    selector: 'img-view',
    template: `
        <div class="img-view-overlay" (click)="hide($event)">
            <div class="img-view-close">&times;</div>
        </div>
        <div class="img-view-content">
            <img class="img-view-content-img" [src]="url" />
        </div>
    `,
    host: {
        '[class.img-view]': 'true',
        '[class.show]': 'show',
        '[tabIndex]': '0',
        '(keyup.esc)': 'onEsc($event)'
    }
})

export class ImgViewComponent {
    @Input() url: string;
    private show: boolean = false;
    private sub: any;

    constructor(
        private imgViewService: ImgViewService
    ) {
        this.sub = this.imgViewService.getEmitter().subscribe(item => {
            this.url = item.url;
            this.show = true;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onEsc($event) {
        $event.preventDefault();
        this.hide($event);
    }

    hide($event) {
        this.show = false;
    }
}
