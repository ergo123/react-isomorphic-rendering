import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { reducer, initialState } from './reducer';
import window from 'global';

const getPreloadedState = () => {
    try {
        const script = document.getElementById("__INITIAL_STATE__");
        const jsonScript = script.innerText.trim();
        script.remove();
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