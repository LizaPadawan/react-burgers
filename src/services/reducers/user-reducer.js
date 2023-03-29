import { initialState } from "../initial-state" ;
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from "../action-types";

export const userReducer = ( state = initialState, action) => {
	switch(action.type){
		case FETCH_USER_REQUEST:
			return state;

		case FETCH_USER_SUCCESS:
			//console.log("userReduserSuccess", action.payload);
			return {
				...state,
				user: action.payload
			}

		case FETCH_USER_ERROR:
			return {
				...state,
				user: initialState.userReducer.user
			}

	    default:
		    return state;	
	}
}