import { EventEmitter } from '@angular/core';

export class NbModal {
    private emitter = new EventEmitter();

    private type: string;
    private title: string;
    private message: string;
    private className: string;
    private errors: any[] = [];
    private buttons: any[];
    private formSchema: any[] = [];
    private model: any;

    private display = false;
    private delay;

    constructor({type, title, message, className, formSchema, model, buttons}) {
        this.type = type;
        this.title = title;
        this.message = message;
        this.className = className;
        this.formSchema = formSchema;
        this.model = model;
        this.buttons = buttons;
    }

    public getEmitter() {
        return this.emitter;
    }

    show() {
        this.display = true;
        this.emitter.emit({ display: true, modal: this });
        return this;
    }

    hide() {
        this.display = false;
        this.emitter.emit({ display: false, modal: this });
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
                this.emitter.emit({ dismiss: true, modal: this });
            }, delay);
        } else {
            this.emitter.emit({ dismiss: true, modal: this });
        }

        return this;
    }
}
