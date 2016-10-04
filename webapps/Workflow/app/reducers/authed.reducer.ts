import { AppActions } from '../actions/app.actions';

export interface IAuthedState {
    userProfile: any,
    languages: any,
    pageSize: number,
    language: string
};

const initialState: IAuthedState = {
    userProfile: null,
    languages: {},
    pageSize: 20,
    language: 'RUS'
};

export const authedReducer = (state = initialState, {type, payload}): IAuthedState => {
    switch (type) {
        case AppActions.FETCH_USER_PROFILE_FULFILLED:
            return Object.assign({}, state, {
                userProfile: payload.userProfile,
                languages: payload.languages,
                pageSize: payload.pageSize,
                language: payload.language
            });
        default:
            return state;
    }
};
