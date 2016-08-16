import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { provide, enableProdMode } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { TRANSLATE_PROVIDERS, TranslateService, TranslateLoader, TranslatePipe } from 'ng2-translate/ng2-translate';
import { Observable } from 'rxjs/Observable'

import { AppComponent } from './components/application/app';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ProjectsComponent } from './components/project/projects';
import { ProjectComponent } from './components/project/project';
import { ProjectListComponent } from './components/project/project-list';
import { TasksComponent } from './components/task/tasks';
import { TaskComponent } from './components/task/task';
import { TaskListComponent } from './components/task/task-list';
import { TaskStreamComponent } from './components/task/task-stream';
import { TaskFilterComponent } from './components/task/task-filter';
import { RequestComponent } from './components/request/request';
import { UserProfileComponent } from './components/user-profile/user-profile';
import { LoginComponent } from './components/login';
import {
    OrganizationInputComponent,
    ProjectInputComponent,
    UserInputComponent,
    TaskTypeInputComponent,
    TagsInputComponent,
    RequestTypeInputComponent
} from './components/shared';
import { AttachmentsComponent } from './components/attachment/attachments';
import { ErrorMessageComponent } from './components/error-message';

import { PaginationComponent } from './shared/pagination';
import { DatepickerDirective } from './shared/datepicker/datepicker';
import { DROPDOWN_DIRECTIVES } from './shared/dropdown';
import { TAB_DIRECTIVES } from './shared/tabs';
import { SwitchButtonComponent } from './shared/switch-button';

import { DateFormatPipe, DateDurationPipe, TextTransformPipe, LocalizedNamePipe } from './pipes';

import { NotificationService, NotificationComponent } from './shared/notification';
import { MarkdownEditorComponent, MarkdownConverter, MarkedPipe } from './shared/markdown';

import { APP_ROUTING } from './app.routing';
import { TranslateService as translateService } from './services/translate.service';
import { APP_SERVICES } from './services';
import { APP_STORE } from './store';
import { APP_STORE_ACTIONS } from './actions';

import { AuthGuard } from './auth.guard';
import { RedirectGuard } from './redirect.guard';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        ProjectsComponent,
        ProjectComponent,
        ProjectListComponent,
        TasksComponent,
        TaskComponent,
        TaskListComponent,
        TaskStreamComponent,
        TaskFilterComponent,
        RequestComponent,
        UserProfileComponent,
        LoginComponent,
        ErrorMessageComponent,
        AttachmentsComponent,
        OrganizationInputComponent, ProjectInputComponent, UserInputComponent, TaskTypeInputComponent, TagsInputComponent, RequestTypeInputComponent,
        PaginationComponent,
        NotificationComponent,
        DatepickerDirective,
        TAB_DIRECTIVES,
        DROPDOWN_DIRECTIVES,
        MarkdownEditorComponent, MarkedPipe,
        SwitchButtonComponent,
        TranslatePipe,
        DateFormatPipe, DateDurationPipe, TextTransformPipe, LocalizedNamePipe
    ],
    imports: [BrowserModule, HttpModule, APP_ROUTING],
    providers: [
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
        APP_STORE,
        APP_STORE_ACTIONS,
        AuthGuard,
        RedirectGuard
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }

class CustomTranslateLoader implements TranslateLoader {
    constructor(private translateService: translateService) { }
    public getTranslation(lang: string): Observable<any> {
        return this.translateService.fetchTranslations();
    }
}

if (webpack.ENV === 'production') {
    enableProdMode();
}
