import { Component, HostBinding, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { AppService, ProjectService, TaskService, ReferenceService, StaffService } from './services';
import { FETCH_ORGANIZATIONS, FETCH_USERS } from './reducers/staff.reducer';
import { NotificationService, NotificationComponent } from './shared/notification';
import { DROPDOWN_DIRECTIVES } from './shared/dropdown';
import { NavComponent } from './components/nav';
import { User } from './models/user';

@Component({
    selector: 'app',
    template: require('./templates/app.html'),
    directives: [ROUTER_DIRECTIVES, NavComponent, NotificationComponent, DROPDOWN_DIRECTIVES],
    providers: [NotificationService],
    pipes: [TranslatePipe]
})

export class AppComponent {
    private sub: any;
    isReady: boolean = false;
    loggedUser: User;
    language: any;
    HEADER_TITLE: string = 'Projects';
    isNavCollapsed: Boolean;
    isSearchOpen: Boolean;
    isMobileDevice: Boolean;

    @HostListener('window:resize', ['$event.target']) resize(window) { this.onResize(window); };
    @HostBinding('class.phone') get device() { return this.isMobileDevice; };
    @HostBinding('class.side-nav-toggle') get toggleNavVisible() { return this.isNavCollapsed; };
    @HostBinding('class.search-open') get toggleSearch() { return this.isSearchOpen; };

    constructor(
        private store: Store<any>,
        private appService: AppService,
        private referenceService: ReferenceService,
        private staffService: StaffService,
        public translate: TranslateService
    ) {
        this.appService.getUserProfile().subscribe((resp: any) => {
            this.loggedUser = resp.employee;
            this.language = resp.language
            this.isReady = true;
            this.appService.isLogged = true;
        });
    }

    ngOnInit() {
        this.sub = this.store.select('reference');

        this.referenceService.loadReference();

        this.staffService.getOrganizations().subscribe(data => {
            this.store.dispatch({ type: FETCH_ORGANIZATIONS, payload: data });
        });

        this.staffService.getUsers().subscribe(data => {
            this.store.dispatch({ type: FETCH_USERS, payload: data });
        });

        this.isSearchOpen = false;
        this.isNavCollapsed = false;
        this.loggedUser = new User();
        this.isMobileDevice = this.isMobile();

        // ng2-translate
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(ru|en)/gi.test(userLang) ? userLang : 'en';
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('en');
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use(userLang);

        this.translate.get('brand').subscribe(value => this.HEADER_TITLE = value);
    }

    ngOnDestroy() {
        this.sub && this.sub.unsubscribe();
    }

    toggleNav() {
        this.isNavCollapsed = !this.isNavCollapsed;
    }

    hideNav(event) {
        event.preventDefault();
        this.isNavCollapsed = false;
        this.isSearchOpen = false;
    }

    searchToggle() {
        this.isSearchOpen = !this.isSearchOpen;
    }

    logout(event) {
        event.preventDefault();
        // this.loggedUser = null;
        window.location.href = 'Logout';
    }

    toWs(event) {
        event.preventDefault();
        window.location.href = '/Workspace/p?id=workspace';
    }

    goBack() {
        window.history.back();
    }

    preventDefault(event) {
        event.preventDefault();
    }

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    onResize(window) {
        this.isMobileDevice = window.innerWidth <= 1024 || this.isMobile();
    }
}
