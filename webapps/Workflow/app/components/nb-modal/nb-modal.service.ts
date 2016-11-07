import { Injectable, EventEmitter, Output } from '@angular/core';

import { NbModal } from './nb-modal';

@Injectable()
export class NbModalService {
    private emitter = new EventEmitter();

    public getEmitter() {
        return this.emitter;
    }

    info(title, message) {
        return this.create({ type: 'info', title: title, message: message });
    }

    confirm(title, message) {
        return this.create({ type: 'confirm', title: title, message: message });
    }

    success(title, message) {
        return this.create({ type: 'success', title: title, message: message });
    }

    error(title, message) {
        return this.create({ type: 'error', title: title, message: message });
    }

    create(options): NbModal {
        let modal = new NbModal(options);
        this.emitter.emit({ command: 'create', modal: modal });
        return modal;
    }
}
