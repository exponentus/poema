export const IS_MOBILE = 'IS_MOBILE';
export const IS_DESKTOP = 'IS_DESKTOP';
export const TOGGLE_NAV = 'TOGGLE_NAV';
export const HIDE_NAV = 'HIDE_NAV';
export const TOGGLE_SEARCH = 'TOGGLE_SEARCH';

export interface IEnvironmentState {
    isMobile: boolean,
    isNavOpen: boolean,
    isSearchOpen: boolean
};

const initialState: IEnvironmentState = {
    isMobile: false,
    isNavOpen: true,
    isSearchOpen: false
};

export const environmentReducer = (state = initialState, {type, payload}): IEnvironmentState => {
    switch (type) {
        case IS_MOBILE:
            return Object.assign({}, state, {
                isMobile: true
            });
        case IS_DESKTOP:
            return Object.assign({}, state, {
                isMobile: false
            });
        case TOGGLE_NAV:
            return Object.assign({}, state, {
                isNavOpen: !state.isNavOpen
            });
        case TOGGLE_SEARCH:
            return Object.assign({}, state, {
                isSearchOpen: !state.isSearchOpen
            });
        case HIDE_NAV:
            return Object.assign({}, state, {
                isNavOpen: true,
                isSearchOpen: false
            });
        default:
            return state;
    }
};
