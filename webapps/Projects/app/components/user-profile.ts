import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';
import { Store } from '@ngrx/store';
import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { TAB_DIRECTIVES } from '../shared/tabs';
import { KeysPipe } from '../pipes/keys.pipe';
import { AppService } from '../services/app.service';
import { TranslateService as translateService } from '../services/translate.service';
import { User } from '../models/user';
import { IAppState } from '../reducers/authed.reducer';
import { createCookie } from '../utils/utils';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Component({
    selector: '[user-profile]',
    template: require('../templates/user-profile.html'),
    directives: [FORM_DIRECTIVES, TAB_DIRECTIVES],
    providers: [FormBuilder],
    pipes: [TranslatePipe, KeysPipe]
})

export class UserProfileComponent {
    user: User = new User();
    form: ControlGroup;
    changePassword: boolean = false;
    pageSize: number;
    language: string = 'RUS';
    languages: any;
    pageSizes = [10, 20, 30, 40, 50];

    constructor(
        private store: Store<any>,
        private http: Http,
        private router: Router,
        private formBuilder: FormBuilder,
        private ng2TranslateService: TranslateService,
        private appService: AppService,
        private translateService: translateService
    ) {
        let ck = document.cookie.match('(lang)=(.*?)($|;|,(?! ))');
        if (ck) {
            this.language = ck[2];
        }
        this.store.select('authed').subscribe((data: IAppState) => {
            this.user = data.userProfile;
            this.pageSize = data.pageSize;
            this.languages = data.languages;
        });

        this.form = formBuilder.group({
            login: [],
            pwd: [],
            pwd_confirm: [],
            email: []
        });
    }

    toggleChangePassword() {
        this.changePassword = !this.changePassword;
    }

    updateUserProfile() {
        this.appService.updateUserProfile(this.user);
    }

    changeLang($event) {
        let langCode = $event.target.value;
        let url = '/Staff/p?id=change-session-val-action&lang=' + langCode;
        return this.http.post(url, {}, { headers: HEADERS })
            .map(response => response.json())
            .subscribe(data => {
                this.ng2TranslateService.reloadLang(langCode).subscribe(r => {
                    this.ng2TranslateService.use(langCode);
                });
                createCookie('lang', langCode, 365);
                window.location.reload();
            });
    }

    close(event) {
        event.preventDefault();
        window.history.back();
    }
}
