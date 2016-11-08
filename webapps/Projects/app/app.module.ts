import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from 'ng2-translate/ng2-translate';
import { Observable } from 'rxjs/Observable';

import { SharedModule } from './shared/shared.module';
import { PipesModule } from './pipes/pipes.module';

import { AppComponent } from './components/application/app';
import { NavbarComponent } from './components/navbar/navbar';
import { NavComponent } from './components/nav/nav';
import { SearchFormComponent, SearchViewComponent } from './components/search';
import { ListPageComponent } from './components/list-page/list-page';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ProjectsComponent } from './components/project/projects';
import { ProjectComponent } from './components/project/project';
import { TasksComponent } from './components/task/tasks';
import { TaskComponent } from './components/task/task';
import { TaskTreeComponent } from './components/task/task-tree';
import { TaskFilterComponent } from './components/task/task-filter';
import { TaskCancelDialogComponent } from './components/task/task-cancel-dialog';
import { RequestComponent } from './components/request/request';
import { RequestDeclineDialogComponent } from './components/request/request-decline-dialog';
import { CommentsComponent } from './components/comment/comments';
import { CommentComponent } from './components/comment/comment';
import { AclComponent } from './components/acl/acl';
import { UserProfileComponent } from './components/user-profile/user-profile';
import { LoginComponent } from './components/login';
import {
    SelectionComponent,
    TagsInputComponent,
    TaskStatusInputComponent,
    ErrorMessageComponent
} from './components/shared';
import { AttachmentsComponent } from './components/attachment/attachments';

import { APP_ROUTES } from './app.routes';
import { APP_SERVICES } from './services';
import { APP_STORE } from './store';
import { APP_STORE_ACTIONS } from './actions';
import { TranslateService as translateService } from './services/translate.service';

import { AuthGuard } from './auth.guard';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavbarComponent,
        NavComponent,
        SearchFormComponent,
        SearchViewComponent,
        ListPageComponent,
        DashboardComponent,
        ProjectsComponent,
        ProjectComponent,
        TasksComponent,
        TaskComponent,
        TaskTreeComponent,
        TaskFilterComponent,
        TaskCancelDialogComponent,
        RequestComponent,
        RequestDeclineDialogComponent,
        CommentsComponent,
        CommentComponent,
        AclComponent,
        UserProfileComponent,
        LoginComponent,
        ErrorMessageComponent,
        AttachmentsComponent,
        SelectionComponent,
        TagsInputComponent,
        TaskStatusInputComponent,
        ErrorMessageComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(APP_ROUTES, { useHash: true }),
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (trs: translateService) => new CustomTranslateLoader(trs),
            deps: [translateService]
        }),
        SharedModule,
        PipesModule
    ],
    providers: [
        APP_SERVICES,
        APP_STORE,
        APP_STORE_ACTIONS,
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
