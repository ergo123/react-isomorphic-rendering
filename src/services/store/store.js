import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducer';

const preloadedState = window.__PRELOADED_STATE__ ? JSON.parse(window.__PRELOADED_STATE__) : undefined;
delete window.__PRELOADED_STATE__;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;