import {combineReducers} from 'redux';
import {history, date} from './HistoryReducer'
export default combineReducers({
    history,
    date,
});
