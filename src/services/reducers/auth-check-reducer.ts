import { initialState, TinitialState } from "../initial-state" ;
import { AUTH_CHECKED } from "../action-types";
import { TActions } from "../action-types";
import { IAuthCheckAction } from "../actions/auth-check-actions-creator";

export const authCheckReducer = ( state = initialState.authCheckReducer, action : IAuthCheckAction) : TinitialState["authCheckReducer"] => {
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