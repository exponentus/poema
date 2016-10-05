import { Incoming } from './models';

import { WorkflowActions } from './workflow.actions';

export interface IWorkflowState {

};

const initialState: IWorkflowState = {

};

export const workflowReducer = (state = initialState, {type, payload}): IWorkflowState => {
    return state;
};
