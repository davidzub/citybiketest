import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './../reducers';
const initialState = {
    history: []
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunk)));