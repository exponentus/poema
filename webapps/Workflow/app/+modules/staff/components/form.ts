import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../actions';
import { StaffService } from '../staff.service';
import { parseResponseObjects } from '../../../utils/utils';

@Component({
    selector: 'staff-form',
    templateUrl: './form.html',
    host: {
        '[class.form]': 'true',
        '[class.load]': 'loading'
    }
})

export class StaffFormComponent {
    @Input() embedded: boolean = false;
    @Input() headerVisible: boolean = true;
    @Input() titleVisible: boolean = true;
    @Input() actionsVisible: boolean = true;

    private subs: any = [];
    private formSchema: any = [];

    isReady = false;
    loading: boolean = true;
    model: any;
    id: string = '';

    constructor(
        private store: Store<any>,
        private route: ActivatedRoute,
        private router: Router,
        private environmentActions: EnvironmentActions,
        private staffService: StaffService
    ) { }

    ngOnInit() {
        this.subs.push(this.route.params.subscribe(params => {
            let viewId = params['viewId'];
            let formId = viewId.replace('-view', '-form');
            let docId = params['docId'];
            let modelId = docId; // this.router.routerState.snapshot.root.queryParams['docid'] || undefined;
            this.id = formId;
            this.loadData({ id: formId, docid: modelId });
        }));
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    // ===
    get title() {
        return this.id;
    }

    loadData(params) {
        this.loading = true;

        this.staffService.fetchOne(params).subscribe(
            payload => {
                let objects = parseResponseObjects(payload.objects);
                let kind = params.id.replace('-form', '').replace('-', '');

                this.model = objects[kind];
                this.formSchema = this.staffService.getFormSchema(this.model.kind);

                this.isReady = true;
                this.loading = false;
            },
            error => console.log(error)
        );
    }

    close() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    submit($event) {
        console.log($event, this.model);
    }
}
