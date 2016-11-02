import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';

import { NbModalService } from './nb-modal.service';
import { NbModal } from './nb-modal';

@Component({
    selector: 'nb-modal',
    template: `
        <div class="nb-modal nb-modal-{{modal.type}}" *ngFor="let modal of modals">
            <header class="nb-modal__header">{{modal.title}}</header>
            <section class="nb-modal__body">{{modal.message}}</section>
            <footer class="nb-modal__footer" *ngIf="modal.buttons">
                <div class="nb-modal__buttons" *ngIf="modal.buttons">
                    <button class="btn nb-modal__button"
                          (click)="button.click(modal, $event)"
                          *ngFor="let button of modal.buttons">
                        <i class="nb-modal__button_icon" (ngClass)="button.icon" *ngIf="button.icon"></i>
                        <span class="nb-modal__button_label">{{button.label}}</span>
                    </button>
                </div>
            </footer>
        </div>
    `
})

export class NbModalComponent {
    @HostBinding('class.nb-modal-container') true;
    @HostBinding('class.hidden') get isHidden() { return this.modals.length == 0; };

    public modals: NbModal[] = [];
    private subs: any;

    constructor(private modalService: NbModalService) { }

    ngOnInit() {
        this.subs = this.modalService.getEmitter().subscribe(item => {
            switch (item.command) {
                case 'closeAll':
                    this.modals = [];
                    break;
                case 'create':
                    this.addModal(item.modal);
                    break;
                default:
                    break;
            }
        });
    }

    ngOnDestroy() {
        if (this.subs) {
            this.modals.map(it => it.getEmitter().unsubscribe());
            this.subs.unsubscribe();
        }
    }

    addModal(modal: NbModal) {
        this.modals.push(modal);
        modal.getEmitter().subscribe(item => this.notifyEmitter(item));
    }

    notifyEmitter(data) {
        if (data.dismiss) {
            let index = this.modals.indexOf(data.notify);
            this.modals.splice(index, 1);
            data.notify.getEmitter().unsubscribe();
        }
    }
}
