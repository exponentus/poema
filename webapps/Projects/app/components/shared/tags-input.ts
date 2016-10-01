import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { IReferenceState } from '../../reducers/reference.reducer';
import { Tag } from '../../models';

@Component({
    selector: 'tags-input',
    template: `
        <selection
            class="tags-input"
            [items]="items"
            [selectedItems]="selectedTags"
            [disabled]="!editable"
            [searchable]="true"
            [allowClear]="allowClear"
            [multiple]="true"
            [placeHolder]="placeHolder"
            (change)="onSelect($event)">
        </selection>
    `
})

export class TagsInputComponent {
    @Input() ids: string[] = [];
    @Input() placeHolder: string = '';
    @Input() editable: boolean = false;
    @Input() allowClear: boolean = false;
    @Output() change = new EventEmitter();

    private items: any[] = [];
    private selectedTags: Tag[] = [];
    private sub: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('reference').subscribe((state: IReferenceState) => {
            this.items = state.tags;
            this.items.map(it => {
                it._itemStyle = { color: it.color };
                it._itemClass = 'tag';
            });
            if (this.ids) {
                this.selectedTags = state.tags.filter(it => this.ids.indexOf(it.id) != -1);
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSelect(selectedTags) {
        this.change.emit(selectedTags);
    }
}
