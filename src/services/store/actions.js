import {api} from '../api';

export const SET_PAGE = 'set-page';
export const SET_APP_LOADED = 'set-app-loaded';

export const fetchApp = () => async (dispatch, getState) => {
    if (!getState().appLoaded) {
        const { data } = await api.getApp();
        Object.keys(data)
            .forEach(key => dispatch(setPage(key, data[key])));
        dispatch(setAppLoaded());
    }
};

export const fetchPage = id => async (dispatch, getState) => {
    if (!getState().pages[id]) {
        const { data } = await api.getPage(id);
        dispatch(setPage(id, data));
    }
};

export const setPage = (id, data) => ({
    type: SET_PAGE,
    id, data
});

export const setAppLoaded = () => ({
    type: SET_APP_LOADED
});