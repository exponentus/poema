import { EnvironmentActions } from '../actions/environment.actions';

export interface IEnvironmentState {
    isMobile: boolean,
    isNavOpen: boolean,
    isSearchOpen: boolean,
    redirectUrl: any,
    apps: any[],
    moduleId: string,
    keyWord: string
};

const initialState: IEnvironmentState = {
    isMobile: false,
    isNavOpen: true,
    isSearchOpen: false,
    redirectUrl: '/tasks',
    apps: [
        { name: 'Reference', url: '/reference' },
        { name: 'Staff', url: '/staff' },
        { name: 'Workflow', url: '/workflow' },
        // { name: 'Projects', url: '/' },
        { name: 'WorkSpace', url: '/workspace' }
    ],
    moduleId: '',
    keyWord: ''
};

export const environmentReducer = (state = initialState, {type, payload}): IEnvironmentState => {
    switch (type) {
        case EnvironmentActions.SEARCH:
            return Object.assign({}, state, {
                keyWord: payload.keyWord
            });
        case EnvironmentActions.RESET_SEARCH:
            return Object.assign({}, state, {
                keyWord: ''
            });
        case EnvironmentActions.TOGGLE_NAV:
            return Object.assign({}, state, {
                isNavOpen: !state.isNavOpen
            });
        case EnvironmentActions.TOGGLE_SEARCH:
            return Object.assign({}, state, {
                isSearchOpen: !state.isSearchOpen
            });
        case EnvironmentActions.HIDE_NAV:
            return Object.assign({}, state, {
                isNavOpen: true,
                isSearchOpen: false
            });
        case EnvironmentActions.SET_REDIRECT_URL:
            return Object.assign({}, state, {
                redirectUrl: payload.redirectUrl
            });
        case EnvironmentActions.SET_APPS:
            return Object.assign({}, state, {
                apps: payload.apps
            });
        case EnvironmentActions.SET_CURRENT_MODULE:
            return Object.assign({}, state, payload.moduleId);
        default:
            return state;
    }
};
