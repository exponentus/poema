import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from 'ng2-translate/ng2-translate';
import { Observable } from 'rxjs/Observable'

import { ImgViewDirective } from './shared/img-view/img-view.directive';
import { ImgViewComponent } from './shared/img-view/img-view.component';
import { ImgViewService } from './shared/img-view/img-view.service';
import { PaginationComponent } from './shared/pagination';
import { AutofocusDirective } from './shared/directives/autofocus.directive';
import { DatepickerDirective } from './shared/datepicker/datepicker';
import { DROPDOWN_DIRECTIVES } from './shared/dropdown';
import { TAB_DIRECTIVES } from './shared/tabs';
import { SwitchButtonComponent } from './shared/switch-button';
import { NotificationService, NotificationComponent } from './shared/notification';
import { MarkdownEditorComponent, MarkdownConverter, MarkedPipe } from './shared/markdown';

import { AppComponent } from './components/application/app';
import { NavbarComponent } from './components/navbar/navbar';
import { NavComponent } from './components/nav/nav';
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
import { CommentsComponent } from './components/comment/comments';
import { CommentComponent } from './components/comment/comment';
import { UserProfileComponent } from './components/user-profile/user-profile';
import { LoginComponent } from './components/login';
import {
    OrganizationInputComponent,
    ProjectInputComponent,
    EmployeeInputComponent,
    TaskTypeInputComponent,
    TagsInputComponent,
    RequestTypeInputComponent,
    TaskStatusInputComponent
} from './components/shared';
import { AttachmentsComponent } from './components/attachment/attachments';
import { ErrorMessageComponent } from './components/error-message';

import {
    DateFormatPipe,
    DateDurationPipe,
    TextTransformPipe,
    LocalizedNamePipe,
    KeysPipe,
    ValuesPipe
} from './pipes';

import { APP_ROUTING } from './app.routing';
import { APP_SERVICES } from './services';
import { APP_STORE } from './store';
import { APP_STORE_ACTIONS } from './actions';
import { TranslateService as translateService } from './services/translate.service';

import { AuthGuard } from './auth.guard';
import { RedirectGuard } from './redirect.guard';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        NavComponent,
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
        CommentsComponent,
        CommentComponent,
        UserProfileComponent,
        LoginComponent,
        ErrorMessageComponent,
        AttachmentsComponent,
        OrganizationInputComponent,
        EmployeeInputComponent,
        ProjectInputComponent,
        TaskTypeInputComponent,
        TagsInputComponent,
        RequestTypeInputComponent,
        TaskStatusInputComponent,
        PaginationComponent,
        NotificationComponent,
        AutofocusDirective,
        DatepickerDirective,
        TAB_DIRECTIVES,
        DROPDOWN_DIRECTIVES,
        MarkdownEditorComponent, MarkedPipe,
        SwitchButtonComponent,
        ImgViewDirective, ImgViewComponent,
        DateFormatPipe, DateDurationPipe, TextTransformPipe, LocalizedNamePipe, KeysPipe, ValuesPipe
    ],
    imports: [
        BrowserModule,
        HttpModule,
        APP_ROUTING,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (trs: translateService) => new CustomTranslateLoader(trs),
            deps: [translateService]
        })
    ],
    providers: [
        NotificationService,
        ImgViewService,
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

declare const webpack: {
    ENV: string
};

if (webpack.ENV === 'production') {
    enableProdMode();
}
