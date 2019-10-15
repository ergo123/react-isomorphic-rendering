import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { reducer, initialState } from './reducer';
import window from 'global';

const getPreloadedState = () => {
    try {
        const jsonScript = document.getElementById("__INITIAL_STATE__").innerText.trim();
        return jsonScript ? JSON.parse(jsonScript) : initialState;
    } catch(e) {
        return initialState;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    getPreloadedState(),
    composeEnhancers(applyMiddleware(thunk))
);

export default store;