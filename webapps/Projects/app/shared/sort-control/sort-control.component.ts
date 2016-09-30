import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';

@Component({
    selector: 'sort-control',
    template: `<ng-content></ng-content>`,
    host: {
        '[class.sort-control]': 'true',
        '[class.both]': 'direction === "both"',
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '[class.is-asc]': '_dir === ASC',
        '[class.is-desc]': '_dir === DESC',
        '(click)': 'onClick($event)'
    }
})

export class SortControlComponent {
    @Input() direction = 'both';
    @Input() active = ''; // name:direction
    @Input() name = '';
    @Output() sort = new EventEmitter();

    private _dir = 0;
    private NONE = 0;
    private ASC = -1;
    private DESC = 1;

    ngOnInit() {
        this.onChanges();
    }

    ngOnChanges() {
        this.onChanges();
    }

    onChanges() {
        let sp = this.active.split(':');
        if (sp[0] === this.name) {
            if (sp[1] === 'asc') {
                this._dir = this.ASC;
            } else if (sp[1] === 'desc') {
                this._dir = this.DESC;
            } else {
                this._dir = this.NONE;
            }
        } else {
            this.active = '';
            this._dir = this.NONE;
        }
    }

    onClick($event) {
        let sort = '';
        if (this.direction === 'both') {
            if (this._dir === this.NONE) {
                sort = this.name + ':asc';
            } else if (this._dir === this.ASC) {
                sort = this.name + ':desc';
            } else if (this._dir === this.DESC) {
                sort = '';
            }
        } else if (this.direction === 'asc') {
            if (this._dir !== this.ASC) {
                sort = this.name + ':asc';
            }
        } else if (this.direction === 'desc') {
            if (this._dir !== this.DESC) {
                sort = this.name + ':desc';
            }
        }

        this.sort.emit(sort);
    }
}
