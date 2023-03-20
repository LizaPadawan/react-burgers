import { initialState } from "../initial-state" ;
import { AUTH_CHECKED } from "../action-types";

const initialStateAuthCheck = initialState.authCheckReducer;

export const authCheckReducer = ( state = initialStateAuthCheck, action) => {
	//console.log(action);
	switch(action.type){
		case AUTH_CHECKED:
			return true;

	    default:			
		    return state;	
	}
}