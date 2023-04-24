
import { initialState, TinitialState } from "../initial-state" ;
import { SET_CONSTRUCTOR, CLEAN_CONSTRUCTOR } from "../action-types";
import { TActions } from "../action-types";
import { TConstructorActions } from "../actions/constructor-actions-creator";

const initialStateConstructor = initialState.constructorReduser.constructor;

export const constructorReduser = ( state = initialState.constructorReduser, action : TConstructorActions) : TinitialState["constructorReduser"] => {
	switch(action.type){
		case SET_CONSTRUCTOR:
			return {
				...state,
				constructor: action.payload
			}

		case CLEAN_CONSTRUCTOR:
			console.log(state);
			console.log({
				...state,
				constructor: initialStateConstructor
			});
			return {
				...state,
				constructor: initialStateConstructor
			}

	    default:
		    return state;	
	}
}