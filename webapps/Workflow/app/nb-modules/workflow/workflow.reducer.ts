import { Incoming } from './models';

import { WorkflowActions } from './workflow.actions';

export interface IIncomingViewState {
    meta: {},
    list: any[],
    loading: boolean
};

const initialState: IIncomingViewState = {
    meta: {},
    list: [],
    loading: false
};

export const workflowReducer = (state = initialState, {type, payload}): IIncomingViewState => {
    switch (type) {
        case WorkflowActions.FETCH_INCOMINGS:
            return Object.assign({}, state, {
                loading: true
            });
        default:
            return state;
    }
};
