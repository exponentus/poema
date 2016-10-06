import { Component, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import {
    AppService,
    TranslateService as translateService
} from '../../services';
import { IAuthedState } from '../../reducers';
import { User } from '../../models';
import { xhrHeaders, createCookie } from '../../utils/utils';

@Component({
    selector: '[user-profile]',
    templateUrl: './user-profile.html',
    providers: [FormBuilder]
})

export class UserProfileComponent {
    private sub: any;
    user: User = null;
    form: FormGroup;
    changePassword: boolean = false;
    pageSize: number;
    language: string = 'RUS';
    languages: any;
    pageSizes = [10, 20, 30, 40, 50];
    errors = {};

    constructor(
        private store: Store<any>,
        private http: Http,
        private router: Router,
        private formBuilder: FormBuilder,
        private ng2Translate: TranslateService,
        private appService: AppService,
        private translateService: translateService,
        private notifyService: NotificationService
    ) {
        this.sub = this.store.select('authed').subscribe((state: IAuthedState) => {
            this.user = state.userProfile;
            this.pageSize = state.pageSize;
            this.language = state.language;
            this.languages = state.languages;

            if (this.user) {
                this.form = formBuilder.group({
                    login: [this.user.login],
                    pwd: [],
                    pwd_new: [],
                    pwd_confirm: [],
                    email: [this.user.email]
                });
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    toggleChangePassword() {
        this.changePassword = !this.changePassword;
    }

    updateUserProfile() {
        let noty = this.notifyService.process(this.ng2Translate.instant('wait_while_document_save')).show();
        this.appService.updateUserProfile(this.form.value).subscribe(
            data => {
                this.errors = {};
                noty.remove();
                this.router.navigate(['/tasks']);
            },
            error => {
                this.errors = {};
                noty.remove()
                if (error.validation) {
                    for (let err of error.validation.errors) {
                        this.errors[err.field] = err.message;
                    }
                }
            }
        );
    }

    changeLang($event) {
        let langCode = $event.target.value;
        let url = '/Staff/p?id=change-session-val-action&lang=' + langCode;
        return this.http.post(url, {}, { headers: xhrHeaders() })
            .map(response => response.json())
            .subscribe(data => {
                this.ng2Translate.reloadLang(langCode).subscribe(r => {
                    this.ng2Translate.use(langCode);
                });
                createCookie('lang', langCode, 365);
                // window.location.reload();
            });
    }

    close() {
        window.history.back();
    }
}
