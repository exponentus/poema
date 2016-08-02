import { Component, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';
import { Store } from '@ngrx/store';
import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../../shared/notification';
import { TAB_DIRECTIVES } from '../../shared/tabs';
import { KeysPipe } from '../../pipes/keys.pipe';
import { AppService } from '../../services/app.service';
import { TranslateService as translateService } from '../../services/translate.service';
import { User } from '../../models/user';
import { IAuthedState } from '../../reducers/authed.reducer';
import { createCookie } from '../../utils/utils';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Component({
    selector: '[user-profile]',
    template: require('./user-profile.html'),
    directives: [FORM_DIRECTIVES, TAB_DIRECTIVES],
    providers: [FormBuilder],
    pipes: [TranslatePipe, KeysPipe]
})

export class UserProfileComponent {
    private sub: any;
    user: User = null;
    form: ControlGroup;
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
                    login: [this.user.name],
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
                this.errors = [];
                noty.remove();
                this.router.navigate(['/tasks']);
            },
            error => {
                this.errors = [];
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
        return this.http.post(url, {}, { headers: HEADERS })
            .map(response => response.json())
            .subscribe(data => {
                this.ng2Translate.reloadLang(langCode).subscribe(r => {
                    this.ng2Translate.use(langCode);
                });
                createCookie('lang', langCode, 365);
                window.location.reload();
            });
    }

    close() {
        window.history.back();
    }
}
