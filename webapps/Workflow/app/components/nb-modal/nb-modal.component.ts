import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';

import { NbModalService } from './nb-modal.service';
import { NbModal } from './nb-modal';

@Component({
    selector: 'nb-modal',
    template: `
        <div class="nb-modal nb-modal-{{modal.type}} {{modal.className}}"
              tabindex="0"
              autofocus
              (keydown.escape)="modal.close()"
              *ngFor="let modal of modals">
            <header class="nb-modal__header">{{modal.title}}</header>
            <button class="nb-modal__dismiss_button" (click)="modal.close()">&times;</button>
            <section class="nb-modal__body">
                <p *ngIf="modal.message">{{modal.message}}</p>
                <schema-form *ngIf="modal.formSchema"
                    [(model)]="modal.model"
                    [errors]="modal.errors"
                    [schema]="modal.formSchema">
                </schema-form>
            </section>
            <footer class="nb-modal__footer" *ngIf="modal.buttons">
                <div class="nb-modal__buttons" *ngIf="modal.buttons">
                    <button class="btn nb-modal__button"
                          [ngClass]="button.className"
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
    @HostBinding('class.hidden') get isHidden() { return !this.hasOpened; };

    private hasOpened: boolean = false;
    public modals: NbModal[] = [];
    private subs: any;

    constructor(private modalService: NbModalService) { }

    ngOnInit() {
        this.subs = this.modalService.getEmitter().subscribe(item => {
            switch (item.command) {
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

    checkOpenedModal() {
        this.hasOpened = this.modals.filter(it => it.hide).length > 0;
    }

    addModal(modal: NbModal) {
        this.modals.push(modal);
        modal.getEmitter().subscribe(item => this.notifyEmitter(item));
    }

    notifyEmitter(data) {
        if (data.dismiss) {
            let index = this.modals.indexOf(data.modal);
            this.modals.splice(index, 1);
            data.modal.getEmitter().unsubscribe();
        }

        this.checkOpenedModal();
    }
}
