import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ImgViewService {
    private emitter: EventEmitter<any> = new EventEmitter();

    constructor() { }

    public getEmitter() {
        return this.emitter;
    }

    show(url: string) {
        this.emitter.emit({ url: url });
    }
}
