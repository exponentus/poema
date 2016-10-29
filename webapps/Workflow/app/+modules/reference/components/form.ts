import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { EnvironmentActions } from '../../../actions';
import { ReferenceService } from '../reference.service';
import { parseResponseObjects } from '../../../utils/utils';

@Component({
    selector: 'reference-form',
    templateUrl: './form.html',
    host: {
        '[class.form]': 'true',
        '[class.load]': 'loading'
    }
})

export class ReferenceFormComponent {
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
        private referenceService: ReferenceService
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

        this.referenceService.fetchOne(params).subscribe(
            payload => {
                let objects = parseResponseObjects(payload.objects);

                this.model = objects[params.id.split('-')[0]];
                this.formSchema = this.referenceService.getFormSchema(this.model.kind);

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
        console.log($event);
    }
}
