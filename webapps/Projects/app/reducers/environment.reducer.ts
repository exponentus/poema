import { EnvironmentActions } from '../actions/environment.actions';

export interface IEnvironmentState {
    isMobile: boolean,
    isNavOpen: boolean,
    isSearchOpen: boolean,
    keyWord: string
};

const initialState: IEnvironmentState = {
    isMobile: false,
    isNavOpen: true,
    isSearchOpen: false,
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
        default:
            return state;
    }
};
