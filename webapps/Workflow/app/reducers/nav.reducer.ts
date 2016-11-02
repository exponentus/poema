import { NavActions } from '../actions/nav.actions';

export interface INavState {
    reload: any
};

const initialState: INavState = {
    reload: {}
};

export const navReducer = (state = initialState, {type, payload}): INavState => {
    switch (type) {
        case NavActions.RELOAD_NAV:
            return Object.assign({}, state, {
                reload: payload
            });
        default:
            return state;
    }
};
