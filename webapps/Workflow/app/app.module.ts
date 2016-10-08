import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateLoader } from 'ng2-translate/ng2-translate';
import { Observable } from 'rxjs/Observable';

// shared
import { SharedModule } from './shared.module';

//
import { AppComponent } from './components/application/app';
import { NavbarComponent } from './components/navbar/navbar';
import { UserProfileComponent } from './components/user-profile/user-profile';
import { LoginComponent } from './components/login';
import { Error404 } from './components/404';

import { AppRoutingModule } from './app.routing';
import { APP_STORE } from './store';
import { AppService, DataService, TranslateService } from './services';
import { AppActions, EnvironmentActions } from './actions';

import { AuthGuard } from './auth.guard';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavbarComponent,
        UserProfileComponent,
        LoginComponent,
        Error404
    ],
    imports: [
        BrowserModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (trs: TranslateService) => new CustomTranslateLoader(trs),
            deps: [TranslateService]
        }),
        AppRoutingModule,
        SharedModule
    ],
    providers: [
        APP_STORE,
        AppService, DataService, TranslateService,
        AppActions, EnvironmentActions,
        AuthGuard
    ]
})

export class AppModule { }

class CustomTranslateLoader implements TranslateLoader {
    constructor(private translateService: TranslateService) { }
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
