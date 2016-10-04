import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class WorkflowActions {

    static FETCH_INCOMINGS = 'FETCH_INCOMINGS';

    //===================================
    //  FETCH
    //-----------------------------------

    fetchIncomings(list: any[]): Action {
        return {
            type: WorkflowActions.FETCH_INCOMINGS,
            payload: { list }
        };
    }
}
