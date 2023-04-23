import { initialState } from "../initial-state" ;
import { AUTH_CHECKED } from "../action-types";
import { TActions } from "../action-types";

export const authCheckReducer = ( state = initialState, action : {type: TActions, payload: any}) => {
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