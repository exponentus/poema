import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { ImgViewService } from './img-view.service';

@Component({
    selector: 'img-view',
    template: `
        <div class="img-view-overlay" (click)="hide($event)">
            <div class="img-view-close">x</div>
        </div>
        <div class="img-view-content">
            <img src="{{url}}" />
        </div>
    `,
    host: {
        '[class.img-view]': 'true',
        '[class.show]': 'show'
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
            console.log(item);
            this.url = item.url;
            this.show = true;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    hide($event) {
        console.log(this.url, $event);
        this.show = false;
    }
}
