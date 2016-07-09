import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { Tag } from '../../models';

@Component({
    selector: 'tags-select',
    directives: [DROPDOWN_DIRECTIVES],
    template: `
        <div dropdown class="select">
            <div dropdown-toggle class="select-selection input">
                <span class="tag"
                    *ngFor="let m of selectedTags"
                    [style.color]="m.color"
                    (click)="remove(m, $event)">
                    {{m.name}}
                </span>
            </div>
            <div class="dropdown-menu select-dropdown">
                <ul class="select-list scroll-shadow">
                    <li class="select-option" *ngFor="let m of getTags()" (click)="add(m)">
                        {{m.name}}
                    </li>
                </ul>
            </div>
        </div>
    `
})

export class TagsSelectComponent {
    @Input() tagIds: string[] = [];
    @Output() setTags: EventEmitter<any> = new EventEmitter();
    private sub: any;
    private tags: any = [];
    private selectedTags: any = [];

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('reference').subscribe((state: any) => {
            this.tags = state.tags;
            if (this.tagIds) {
                this.selectedTags = state.tags.filter(it => this.tagIds.indexOf(it.id) != -1);
            }
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

    add(m) {
        this.selectedTags.push(m);
        this.setTags.emit(this.selectedTags);
    }

    remove(m) {
        this.selectedTags = this.selectedTags.filter(it => it.id != m.id);
        this.setTags.emit(this.selectedTags);
    }
}
