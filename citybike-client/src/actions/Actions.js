export const ADD_TO_HISTORY = 'ADD_TO_HISTORY';
export const SET_DATE = 'SET_DATE';
const AddToHistory = (payload) => ({ type: ADD_TO_HISTORY, payload });
export const setDate = (payload) => ({ type: SET_DATE, payload });

export default AddToHistory;