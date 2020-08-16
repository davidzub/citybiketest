
import { ADD_TO_HISTORY } from "../actions/Actions";
export const history = (state = {}, action) => {
    switch (action.type) {
        case ADD_TO_HISTORY:
            return { ...state, history : [...state.history, action.payload] }
 
        default:
            return state;
    }
}