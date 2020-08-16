import {createStore, compose} from 'redux';
import reducers from './../reducers';
const initialState = {
    history: []
};
export const store = createStore(reducers, initialState, compose);