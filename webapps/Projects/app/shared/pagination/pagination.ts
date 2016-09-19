import { Component, Input, Output, EventEmitter, OnChanges, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'pagination',
    template: `
        <div class="pagination" *ngIf="totalPages > 1">
            <a href="#" *ngIf="startPage > 1" (click)="setPage(1, $event)">1</a>
            <span *ngIf="startPage > 1">...</span>
            <a [class.page-active]="p == currentPage" href="#" *ngFor="let p of pages" (click)="setPage(p, $event)">{{p}}</a>
            <span *ngIf="stopPage < totalPages">...</span>
            <a *ngIf="stopPage < totalPages" href="#" (click)="setPage(totalPages, $event)">{{totalPages}}</a>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PaginationComponent {
    @HostBinding('hidden') get isHidden() { return this.totalPages < 2 };
    @Input('page') currentPage: number = 0;
    @Input() totalPages: number = 0;
    @Input() maxPageControl: number = 5;
    @Output() change = new EventEmitter<any>();

    private startPage: number = 0;
    private stopPage: number = 0;
    private pages: number[] = [];

    ngOnChanges() {
        this.pagination();
    }

    setPage(page: number, $event) {
        $event.preventDefault();
        this.change.emit({ page: page });
    }

    pagination() {
        this.pages = [];

        if (this.totalPages <= 1) {
            return;
        }

        let perPage = Math.floor(this.maxPageControl / 2);
        this.startPage = (this.currentPage - perPage);
        this.stopPage = (this.currentPage + perPage);

        if (this.startPage <= perPage) {
            this.startPage = 1;
        } else if (this.currentPage == this.totalPages) {
            this.startPage = this.totalPages - this.maxPageControl;
        }

        if (this.stopPage > (this.totalPages - perPage)) {
            this.stopPage = this.totalPages;
        } else if (this.currentPage == 1) {
            this.stopPage = this.maxPageControl + 1;
        }

        if ((this.maxPageControl + perPage) >= this.totalPages) {
            this.startPage = 1;
            this.stopPage = this.totalPages;
        }

        for (let p = this.startPage; p <= this.stopPage; p++) {
            this.pages.push(p);
        }
    }
}
