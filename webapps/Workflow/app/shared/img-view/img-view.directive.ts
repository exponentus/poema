import { Directive, Input } from '@angular/core';

import { ImgViewService } from './img-view.service';

@Directive({
    selector: '[img-view]',
    host: {
        '(click)': 'show($event)'
    }
})

export class ImgViewDirective {
    @Input() url: string;

    constructor(
        private imgViewService: ImgViewService
    ) { }

    show($event) {
        this.imgViewService.show(this.url);
    }
}
