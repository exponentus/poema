import { Component, HostBinding, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { EnvironmentActions, AppActions } from '../../actions';
import { AppService, ReferenceService } from '../../services';
import { IEnvironmentState } from '../../reducers/environment.reducer';
import { IAuthedState } from '../../reducers/authed.reducer';
import { User } from '../../models';

@Component({
    selector: 'app',
    templateUrl: './app.html'
})

export class AppComponent {
    private subs: any = [];
    isReady: boolean = false;
    loggedUser: User = new User();
    language: any;
    HEADER_TITLE: string = 'Projects';
    isNavCollapsed: boolean = false;
    isSearchOpen: boolean = false;
    isMobileDevice: boolean = false;

    @HostListener('window:resize', ['$event.target']) resize(window) { this.onResize(window); };
    @HostBinding('class.phone') get device() { return this.isMobileDevice; };
    @HostBinding('class.side-nav-toggle') get toggleNavVisible() { return this.isNavCollapsed; };
    @HostBinding('class.search-open') get toggleSearch() { return this.isSearchOpen; };

    constructor(
        private store: Store<any>,
        private appActions: AppActions,
        private appService: AppService,
        private referenceService: ReferenceService,
        public translate: TranslateService
    ) {
        this.subs.push(this.store.select('authed').subscribe((data: IAuthedState) => {
            this.loggedUser = data.userProfile;
        }));

        this.subs.push(this.store.select('environment').subscribe((state: IEnvironmentState) => {
            this.isSearchOpen = state.isSearchOpen;
            this.isNavCollapsed = !state.isNavOpen;
        }));
    }

    ngOnInit() {
        this.appService.fetchUserProfile().subscribe(data => {
            this.store.dispatch(this.appActions.fetchUserProfileFulfilled(data));
        });

        this.isMobileDevice = this.isMobile();

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
