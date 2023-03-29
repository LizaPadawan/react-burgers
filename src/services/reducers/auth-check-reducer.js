// import { initialState } from "../initial-state" ;
// import { AUTH_CHECKED } from "../action-types";

// const initialStateAuthCheck = initialState.authCheckReducer;

// export const authCheckReducer = ( state = initialStateAuthCheck, action) => {
// 	//console.log(action);
// 	switch(action.type){
// 		case AUTH_CHECKED:
// 			return true;

// 	    default:			
// 		    return state;	
// 	}
// }

import { initialState } from "../initial-state" ;
import { AUTH_CHECKED } from "../action-types";

export const authCheckReducer = ( state = initialState, action) => {
	//console.log(action);
	switch(action.type){
		case AUTH_CHECKED:
			return {
				...state,
				isAuthChecked: true
			}

	    default:			
		    return state;	
	}
}