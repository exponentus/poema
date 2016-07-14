import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide, enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { TRANSLATE_PROVIDERS, TranslateService, TranslateLoader } from 'ng2-translate/ng2-translate';
import { Observable } from 'rxjs/Observable'

import { NotificationService } from './shared/notification';
import { MarkdownConverter } from './shared/markdown';
import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import { TranslateService as translateService } from './services/translate.service';
import { APP_SERVICES } from './services';
import { APP_STORE } from './store';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    TranslateService,
    TRANSLATE_PROVIDERS,
    provide(TranslateLoader, {
        useFactory: (trs: translateService) => new CustomTranslateLoader(trs),
        deps: [translateService]
    }),
    NotificationService,
    MarkdownConverter,
    APP_SERVICES,
    APP_STORE
]).catch(err => console.error(err));

//
class CustomTranslateLoader implements TranslateLoader {
    constructor(private translateService: translateService) { }

    public getTranslation(lang: string): Observable<any> {
        return this.translateService.fetchTranslations();
    }
}
