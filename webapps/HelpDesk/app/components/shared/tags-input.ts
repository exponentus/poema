import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { ReferenceService } from '../../services';
import { Tag } from '../../models';

@Component({
    selector: 'tags-input',
    template: `
        <selection
            class="tags-input"
            [items]="tags"
            [selectedItems]="selectedTags"
            [disabled]="!editable"
            [searchable]="true"
            [allowClear]="allowClear"
            [multiple]="true"
            [placeHolder]="placeHolder"
            (load)="load($event)"
            (change)="onSelect($event)">
        </selection>
    `
})

export class TagsInputComponent {
    @Input('selectedTags') set _selectedTags(selectedTags: any[]) {
        if (selectedTags) {
            selectedTags.map(it => {
                it._itemStyle = { color: it.color };
                it._itemClass = 'tag';
            });
        }
        this.selectedTags = selectedTags;
    }
    @Input() placeHolder: string = '';
    @Input() editable: boolean = false;
    @Input() allowClear: boolean = false;
    @Input() withHidden: boolean = false;
    @Output() change = new EventEmitter();

    private selectedTags: Tag[] = [];
    private tags: any[] = [];
    private meta: any = { page: 0, totalPages: 1 };
    private allLoaded = false;
    private firstLoad = true;

    constructor(private referenceService: ReferenceService) { }

    load($load) {
        if ($load.first && this.firstLoad) {
            this.loadTags();
            this.firstLoad = false;
        } else if ($load.next && !this.allLoaded) {
            if (this.meta && this.meta.page < this.meta.totalPages) {
                this.loadTags(this.meta.page + 1);
            } else {
                this.allLoaded = true;
            }
        } else if (typeof $load.search === 'string') {
            this.loadTags(1, $load.search, true);
        }
    }

    loadTags(page = 1, keyWord = '', isSearch = false) {
        return this.referenceService.fetchTags({ page: page, keyword: keyWord, hidden: this.withHidden }).subscribe(payload => {
            if (isSearch) {
                this.tags = payload.tags;
            } else {
                this.tags = this.tags.concat(payload.tags);
            }
            this.tags.map(it => {
                it._itemStyle = { color: it.color };
                it._itemClass = 'tag';
            });
            if (!this.withHidden) {
                this.tags = this.tags.filter(it => !it.hidden);
            }
            this.meta = payload.meta;
        });
    }

    onSelect(selectedTags) {
        this.selectedTags = selectedTags;
        this.change.emit(selectedTags);
    }
}
