
import { ADD_TO_HISTORY, SET_DATE} from "../actions/Actions";
import {toPairs} from'lodash';
import { createSelector } from "reselect";
export const history = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_HISTORY:
            const{markers, date} = action.payload
            return {...state, [date]: {...state[date], markers, date}}
        default:
            return state;
    }
}
export const date = (state = {}, action) => {
    switch (action.type) {
        case SET_DATE:
            return action.payload
        default:
            return state;
    }
}
const getDate = createSelector(state => state.date, date => date);
const  getMarkers = createSelector((state, date) => state[date] && state[date].markers, markers => markers);
const fromObjectToArray = dates => (toPairs(dates).map(([key,value]) => ({key, value: key, label: key, markers: value.markers})));
export const getMarkersDataFromDates = createSelector(state => state.history, getDate, getMarkers);
export const getHistory = createSelector(state => fromObjectToArray(state.history), dates => dates)