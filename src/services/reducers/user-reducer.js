import { initialState } from "../initial-state" ;
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from "../action-types";

const initialStateUser = initialState.userReducer;

export const userReducer = ( state = initialStateUser, action) => {
	switch(action.type){
		case FETCH_USER_REQUEST:
			return state;

		case FETCH_USER_SUCCESS:
			console.log("userReduserSuccess", action.payload);
			return action.payload;

		case FETCH_USER_ERROR:
			return initialStateUser;

	    default:
		    return initialStateUser;	
	}
}