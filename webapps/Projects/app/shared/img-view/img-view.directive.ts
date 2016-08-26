import { Directive, Input } from '@angular/core';

import { ImgViewService } from './img-view.service';

@Directive({
    selector: '[img-view]',
    host: {
        '(click)': 'onClick($event)'
    }
})

export class ImgViewDirective {
    @Input() url: string;

    constructor(
        private imgViewService: ImgViewService
    ) { }

    onClick($event) {
        this.imgViewService.showUrl(this.url);
    }
}
