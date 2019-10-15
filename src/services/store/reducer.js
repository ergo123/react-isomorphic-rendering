import {SET_APP_LOADED, SET_PAGE} from './actions';

export const initialState = {
    pages: {}
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_APP_LOADED:
            return {
                ...state,
                appLoaded: true
            };
        case SET_PAGE:
            return {
                ...state,
                pages: {
                    ...state.pages,
                    [action.id]: action.data
                }
            };
        default: return state
    }
}