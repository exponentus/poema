import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
    selector: 'list-page',
    templateUrl: './list-page.html',
    host: {
        '[class.list-page]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListPageComponent {
    @Input() title: string = '';
    @Input() emptyMessage: string = 'view_no_entries';
    @Input() selectable: boolean = true; // show checkboxes
    @Input() headerVisible: boolean = true;
    @Input() titleVisible: boolean = true;
    @Input() actionsVisible: boolean = true;
    @Input() captionsVisible: boolean = true;
    /**
     * activeSort
     * current sort state if columns sortable
     */
    @Input() activeSort: string = 'regDate:desc';
    @Input() list: any[] = []; // model list
    @Input() meta: any = {}; // list meta data
    @Input() actions: any[] = [];
    /**
     * columns
     * {
     *  root: {name, value, type, sort, className},
     *  'entity kind': {value, type, className} // optional
     * }
     * @param name - column name
     * @param value - model field name
     * @param type - text, date, localizedName
     * @param sort - desc, asc, both
     * @param className - css class name
     * @param valueAsClass - add value as class {valueAsClass + model[value]}
     */
    @Input() columns = { root: [{ name: 'name', value: 'name', type: 'text', sort: 'desc', className: 'vw-name', valueAsClass: '' }] };

    @Output() action = new EventEmitter();
    @Output() refresh = new EventEmitter();
    @Output() sort = new EventEmitter();
    @Output() goToPage = new EventEmitter();
    @Output() openUrl = new EventEmitter();

    onOpenUrl(model, $event) {
        $event.preventDefault();
        this.openUrl.emit(model);
    }

    onAction(action, $event) {
        this.action.emit({ action, e: $event });
    }

    onRefresh() {
        this.refresh.emit(true);
    }

    onGoToPage($event) {
        this.goToPage.emit($event);
    }

    onSort($event) {
        this.sort.emit($event);
    }
}
