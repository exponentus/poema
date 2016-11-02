import { EventEmitter } from '@angular/core';

export class NbModal {
    private emitter = new EventEmitter();

    private type: string;
    private title: string;
    private message: string;
    private buttons: any[];
    private display = false;
    private delay;
    private promise;

    constructor({type, title, message, buttons}) {
        this.type = type;
        this.title = title;
        this.message = message;
        this.buttons = buttons;
    }

    public getEmitter() {
        return this.emitter;
    }

    show() {
        this.display = true;
        return this;
    }

    hide() {
        this.display = false;
        return this;
    }

    set(options) {
        for (var key in options) {
            if (key === 'message') {
                this.message = options[key];
            } else if (key === 'type') {
                this.type = options[key];
            }
        }
        return this;
    }

    close(delay: any = 0) {
        this.delay = delay;

        if (delay > 0) {
            setTimeout(() => {
                this.emitter.emit({ dismiss: true, notify: this, promise: this.promise });
            }, delay);
        } else {
            this.emitter.emit({ dismiss: true, notify: this, promise: this.promise });
        }

        return this.promise;
    }
}
