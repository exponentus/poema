export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

const initialState = {
    meta: {},
    tasks: []
};

export const tasksReducer = (state = initialState, {type, payload}) => {
    console.log('ACTION:', type, payload);

    switch (type) {
        case ADD_TASK:
            return state;
        case UPDATE_TASK:
            return state;
        case DELETE_TASK:
            return state;
        default:
            return state;
    }
};
