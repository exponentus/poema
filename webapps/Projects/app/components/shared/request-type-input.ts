import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { IReferenceState } from '../../reducers/reference.reducer';
import { Request } from '../../models';

@Component({
    selector: 'request-type-input',
    template: `
        <span *ngIf="!editable">
            {{requestType?.name}}
        </span>
        <div dropdown class="select task-type-input" *ngIf="editable">
            <div dropdown-toggle class="select-selection input">
                <span>{{requestType?.name}}</span>
            </div>
            <div class="dropdown-menu select-dropdown">
                <div class="select-search" *ngIf="searchable">
                    <input placeholder="{{'search' | translate}}" #searchInput (keyup)="search($event.target.value)" />
                    <button type="button" class="btn select-search-reset" *ngIf="searchInput.value" (click)="searchInput.value = '' && search('')">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
                <ul class="select-list scroll-shadow" (scroll)="onScroll($event)">
                    <li class="select-option" [class.selected]="requestType?.id == m.id" *ngFor="let m of requestTypes" (click)="onSelect(m)">
                        {{m.name}}
                    </li>
                </ul>
            </div>
        </div>
    `,
    directives: [DROPDOWN_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class RequestTypeInputComponent {
    @Input() requestTypeId: string;
    @Input() editable: boolean = false;
    @Input() searchable: boolean = false;
    @Output() select: EventEmitter<any> = new EventEmitter();
    private requestTypes: any;
    private requestType: any;
    private sub: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('reference').subscribe((state: IReferenceState) => {
            this.requestTypes = state.requestTypes;
            this.requestType = state.requestTypes.filter(it => it.id == this.requestTypeId)[0];
            this.searchable = this.requestTypes.length > 13;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    search(keyWord) {
        console.log(keyWord);
    }

    onSelect(m) {
        this.requestType = m;
        this.select.emit(this.requestType);
        document.body.click();
    }

    onScroll($event) {
        let {scrollHeight, clientHeight, scrollTop} = $event.target;
        if ((scrollHeight - clientHeight) == scrollTop) {
            console.log('scroll end');
        }
    }
}
