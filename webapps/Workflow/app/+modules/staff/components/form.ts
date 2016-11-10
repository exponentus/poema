import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../../shared/notification';
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

    private isReady = false;
    private isNew = true;
    private isEditable = false;
    private isValid = true;

    private errors: any = {};
    private fsId: string;
    private formSchema: any = [];
    private loading: boolean = true;
    private model: any;
    private id: string = '';
    private actions: any = [];

    private subs: any = [];

    constructor(
        private store: Store<any>,
        private route: ActivatedRoute,
        private router: Router,
        private translate: TranslateService,
        private notifyService: NotificationService,
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
                this.actions = objects.actions;
                this.fsId = payload.payload ? payload.payload.fsId : Date.now();
                this.formSchema = this.staffService.getFormSchema(this.model.kind);

                if (!this.model.localizedName) {
                    this.model.localizedName = {};
                }

                this.isReady = true;
                this.loading = false;
            },
            error => console.log(error)
        );
    }

    save($event) {
        let noty = this.notifyService.process(this.translate.instant('wait_while_document_save')).show();

        // create localizedName field if exists
        if (this.model.localizedName) {
            for (let locale in this.model.localizedName) {
                this.model[locale.toLowerCase() + 'localizedname'] = this.model.localizedName[locale];
            }
        }

        this.staffService.save(this.model, { fsid: this.fsId }).subscribe(
            response => {
                noty.set({ type: 'success', message: (response.message || response.captions.type) }).remove(1500);
                this.close();
            },
            error => {
                noty.remove();
                this.handleXhrError(error);
                this.handleValidationError(error);
            }
        );
    }

    close() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    onAction(action, $event) {
        if (action.type === 'CLOSE') {
            this.close();
        } else if (action.type === 'SAVE_AND_CLOSE') {
            this.save($event);
        }
    }

    handleXhrError(errorResponse) {
        this.notifyService.error(errorResponse.message).show().remove(2000);
    }

    handleValidationError(error: any) {
        let errors = {};
        let _errors = error.errors || (error.validation ? error.validation.errors : []);

        if (_errors) {
            this.isValid = false;
            for (let err of _errors) {
                errors[err.field] = {
                    message: err.message,
                    error: err.error
                };
            }
        }

        this.errors = errors;
    }

    // validate
    validateForm(field?: string) {
        for (let errField in this.errors) {
            if (this.model[errField]) {
                this.errors[errField] = false;
            }
        }

        let isValid = true;
        for (let errField in this.errors) {
            if (this.errors[errField] !== false) {
                isValid = false;
                break;
            }
        }
        this.isValid = isValid;
    }
}
