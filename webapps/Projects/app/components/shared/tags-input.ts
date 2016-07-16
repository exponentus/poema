import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
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
        <div dropdown class="select tags-input" *ngIf="editable">
            <div dropdown-toggle class="select-selection input">
                <span
                    class="tag"
                    *ngFor="let m of selectedTags"
                    [style.color]="m.color"
                    (click)="remove(m, $event)">
                    {{m.name}}
                </span>
            </div>
            <div class="dropdown-menu select-dropdown">
                <div class="select-search" *ngIf="searchable">
                    <input placeholder="{{'search' | translate}}" #searchInput (keyup)="search($event.target.value)" />
                    <button type="button" class="btn select-search-reset" *ngIf="searchInput.value" (click)="searchInput.value = ''">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
                <ul class="select-list scroll-shadow" (scroll)="onScroll($event)">
                    <li class="select-option" [class.selected]="taskTypeId == m.id" *ngFor="let m of getTags()" (click)="add(m)">
                        {{m.name}}
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
    @Input() editable: boolean = false;
    @Input() searchable: boolean = true;
    @Output() select: EventEmitter<any> = new EventEmitter();
    private tags: Tag[] = [];
    private selectedTags: Tag[] = [];
    private sub: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('reference').subscribe((state: any) => {
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

    search(keyWord) {
        console.log(keyWord);
    }

    getTags() {
        if (this.tagIds) {
            return this.tags.filter(it => this.tagIds.indexOf(it.id) == -1);
        } else {
            return this.tags;
        }
    }

    add(tag: Tag) {
        this.selectedTags.push(tag);
        this.tagIds.push(tag.id);
        this.select.emit(this.selectedTags);
    }

    remove(tag: Tag) {
        this.selectedTags = this.selectedTags.filter(it => it.id != tag.id);
        this.tagIds = this.selectedTags.map(it => it.id);
        this.select.emit(this.selectedTags);
    }

    onScroll($event) {
        let {scrollHeight, clientHeight, scrollTop} = $event.target;
        console.log(scrollHeight - clientHeight, scrollTop);
    }
}
