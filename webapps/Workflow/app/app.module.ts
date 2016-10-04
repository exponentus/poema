import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateLoader } from 'ng2-translate/ng2-translate';
import { Observable } from 'rxjs/Observable';

// shared
import { SharedModule } from './shared.module';

// nb modules
import { ReferenceModule } from './nb-modules/reference/reference.module';
import { StaffModule } from './nb-modules/staff/staff.module';
import { WorkflowModule } from './nb-modules/workflow/workflow.module';

import { AppComponent } from './components/application/app';
import { NavbarComponent } from './components/navbar/navbar';
import { NavComponent } from './components/nav/nav';
import { NavTreeComponent } from './components/nav/nav-tree';
import { UserProfileComponent } from './components/user-profile/user-profile';
import { LoginComponent } from './components/login';
import { Error404 } from './components/404';
import {
    SelectionComponent,
    OrganizationInputComponent,
    EmployeeInputComponent,
    TagsInputComponent,
    ErrorMessageComponent
} from './components/shared';

import { APP_ROUTES } from './app.routes';
import { APP_STORE } from './store';
import { AppService, TranslateService } from './services';
import { AppActions, EnvironmentActions } from './actions';

import { TranslateService as translateService } from './services/translate.service';

import { AuthGuard } from './auth.guard';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavbarComponent,
        NavComponent,
        NavTreeComponent,
        UserProfileComponent,
        LoginComponent,
        Error404,
        ErrorMessageComponent,
        SelectionComponent,
        OrganizationInputComponent, EmployeeInputComponent, TagsInputComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(APP_ROUTES, { useHash: true }),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (trs: translateService) => new CustomTranslateLoader(trs),
            deps: [translateService]
        }),
        SharedModule,
        ReferenceModule,
        StaffModule,
        WorkflowModule
    ],
    providers: [
        APP_STORE,
        AppService, TranslateService,
        AppActions, EnvironmentActions,
        AuthGuard
    ]
})

export class AppModule { }

class CustomTranslateLoader implements TranslateLoader {
    constructor(private translateService: translateService) { }
    public getTranslation(lang: string): Observable<any> {
        return this.translateService.fetchTranslations();
    }
}

declare const webpack: {
    ENV: string
};

if (webpack.ENV === 'production') {
    enableProdMode();
}
