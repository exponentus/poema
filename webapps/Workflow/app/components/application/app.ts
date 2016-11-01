import { Component, HostBinding, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { EnvironmentActions } from '../../actions';
import { IEnvironmentState } from '../../reducers';
import { AppService } from '../../services';
import { User } from '../../models';

@Component({
    selector: 'app',
    templateUrl: './app.html'
})

export class AppComponent {
    @HostListener('window:resize', ['$event.target']) resize(window) { this.onResize(window); };
    @HostBinding('class.phone') get device() { return this.isMobileDevice; };
    @HostBinding('class.side-nav-toggle') get toggleNavVisible() { return this.isNavCollapsed; };
    @HostBinding('class.search-open') get toggleSearch() { return this.isSearchOpen; };

    private subs: any = [];
    isReady: boolean = false;
    loggedUser: User = new User();
    language: any;
    moduleId: string = '';
    HEADER_TITLE: string = '';
    isNavCollapsed: boolean = false;
    isSearchOpen: boolean = false;
    isMobileDevice: boolean = false;

    constructor(
        private store: Store<any>,
        private environmentActions: EnvironmentActions,
        private appService: AppService,
        public translate: TranslateService
    ) {
        this.subs.push(this.store.select('environment').subscribe((state: IEnvironmentState) => {
            this.moduleId = state.moduleId;
            this.isSearchOpen = state.isSearchOpen;
            this.isNavCollapsed = !state.isNavOpen;
            this.loggedUser = state.userProfile;
        }));
    }

    ngOnInit() {
        this.appService.fetchUserProfile().subscribe(data => {
            this.store.dispatch(this.environmentActions.fetchUserProfile(data));
        });

        // ng2-translate
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(ru|en)/gi.test(userLang) ? userLang : 'en';
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('en');
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use('en'); // userLang

        this.translate.get('brand').subscribe(value => {
            this.HEADER_TITLE = value;
            this.isReady = true;
        });

        this.onResize(window);
    }

    ngOnDestroy() {
        this.subs.map(s => s.unsubscribe());
    }

    hideNav(event) {
        this.store.dispatch({ type: EnvironmentActions.HIDE_NAV });
        event.preventDefault();
    }

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    onResize(window) {
        this.isMobileDevice = window.innerWidth <= 1024 || this.isMobile();
    }
}
