import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { IReferenceState } from '../../reducers/reference.reducer';
import { Tag } from '../../models';

@Component({
    selector: 'tags-input',
    template: `
        <span *ngIf="!editable">
            <span
                class="tag"
                *ngFor="let m of selectedTags"
                [style.color]="m.color"
                (click)="remove(m, $event)">
                {{m.name}}
            </span>
        </span>
        <div dropdown class="select tags-input" [class.allow-clear]="allowClear" [class.has-selected]="selectedTags.length" *ngIf="editable">
            <div dropdown-toggle class="select-selection input">
                <span
                    class="tag"
                    *ngFor="let m of selectedTags"
                    [style.color]="m.color"
                    (click)="remove(m, $event)">
                    {{m.name}}
                </span>
                <span class="placeholder">{{placeHolder}}</span>
                <div class="clear" *ngIf="allowClear && selectedTags.length" (click)="clear($event)">
                    <i class="fa fa-times"></i>
                </div>
            </div>
            <div class="dropdown-menu select-dropdown">
                <div class="select-search" *ngIf="searchable">
                    <input placeholder="{{'search' | translate}}" #searchInput (keyup)="search($event.target.value)" />
                    <button type="button" class="btn select-search-reset" *ngIf="searchInput.value" (click)="searchInput.value = '' && search('')">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
                <ul class="select-list scroll-shadow" (scroll)="onScroll($event)">
                    <li class="select-option" *ngFor="let m of getTags()" (click)="add(m)">
                        <span [style.color]="m.color">
                            {{m.name}}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    `,
    directives: [DROPDOWN_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class TagsInputComponent {
    @Input() tagIds: string[] = [];
    @Input() placeHolder: string = '';
    @Input() editable: boolean = false;
    @Input() searchable: boolean = false;
    @Input() allowClear: boolean = false;
    @Output() select: EventEmitter<any> = new EventEmitter();
    private tags: Tag[] = [];
    private selectedTags: Tag[] = [];
    private sub: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('reference').subscribe((state: IReferenceState) => {
            this.tags = state.tags;
            if (this.tagIds) {
                this.selectedTags = state.tags.filter(it => this.tagIds.indexOf(it.id) != -1);
            }
            this.searchable = this.tags.length > 13;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getTags() {
        if (this.tagIds) {
            return this.tags.filter(it => this.tagIds.indexOf(it.id) == -1);
        } else {
            return this.tags;
        }
    }

    search(keyWord) {
        console.log(keyWord);
    }

    clear($event) {
        $event.stopPropagation();
        this.selectedTags = [];
        this.tagIds = [];
        this.select.emit(this.selectedTags);
    }

    add(tag: Tag) {
        this.selectedTags.push(tag);
        this.tagIds = this.selectedTags.map(it => it.id);
        this.select.emit(this.selectedTags);
    }

    remove(tag: Tag, $event) {
        $event.stopPropagation();
        this.selectedTags = this.selectedTags.filter(it => it.id != tag.id);
        this.tagIds = this.selectedTags.map(it => it.id);
        this.select.emit(this.selectedTags);
    }

    onScroll($event) {
        let {scrollHeight, clientHeight, scrollTop} = $event.target;
        if ((scrollHeight - clientHeight) == scrollTop) {
            console.log('scroll end');
        }
    }
}
