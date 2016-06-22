export const ADD_PROJECT = 'ADD_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';

const initialState = {
    meta: {},
    projects: []
};

export const projectsReducer = (state = initialState, {type, payload}) => {
    console.log('ACTION:', type, payload);

    switch (type) {
        case ADD_PROJECT:
            return state;
        case UPDATE_PROJECT:
            return state;
        case DELETE_PROJECT:
            return state;
        default:
            return state;
    }
};
