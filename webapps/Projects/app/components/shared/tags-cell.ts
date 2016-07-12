import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'tags-cell',
    template: `<span class="tag" [style.color]="tag.color" *ngFor="let tag of tags">{{tag.name}}</span>`
})

export class TagsCellComponent {
    @Input() tagIds: string[];
    private sub: any;
    private tags: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.sub = this.store.select('reference').subscribe((state: any) => {
            if (state && state.tags) {
                this.tags = state.tags.filter(it => this.tagIds.indexOf(it.id) != -1);
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
