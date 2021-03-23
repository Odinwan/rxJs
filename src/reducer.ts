import {ActionInterface, State} from "./interfaces";

export default (state:State, action:ActionInterface) => {
    switch (action.type) {
        case  'SET_MOVIES':
            return {
                ...state,
                movies: action.payload,
            }
        default:
            return state;
    }
}
