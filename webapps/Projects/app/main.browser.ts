import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide, enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { TRANSLATE_PROVIDERS, TranslateService, TranslatePipe, TranslateLoader } from 'ng2-translate/ng2-translate';
import { Observable } from 'rxjs/Observable'

import { NotificationService } from './shared/notification';
import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import { AppService } from './services/app.service';
import { APP_SERVICES } from './services';

import { store } from './reducers/store';

bootstrap(AppComponent, [
    ...HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy, useValue: location.href }),
    TranslateService,
    TRANSLATE_PROVIDERS,
    provide(TranslateLoader, {
        useFactory: (appService: AppService) => new CustomTranslateLoader(appService),
        deps: [AppService]
    }),
    NotificationService,
    ...APP_SERVICES,
    store
]).catch(err => console.error(err));

//
class CustomTranslateLoader implements TranslateLoader {
    constructor(private appService: AppService) { }

    public getTranslation(lang: string): Observable<any> {
        return this.appService.getTranslations();
    }
}
