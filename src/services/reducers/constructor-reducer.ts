
import { initialState } from "../initial-state" ;
import { SET_CONSTRUCTOR, CLEAN_CONSTRUCTOR } from "../action-types";
import { TActions } from "../action-types";

const initialStateConstructor = initialState.constructorReduser.constructor;

export const constructorReduser = ( state = initialState, action : {type: TActions, payload: any}) => {
	switch(action.type){
		case SET_CONSTRUCTOR:
			return {
				...state,
				constructor: action.payload
			}

		case CLEAN_CONSTRUCTOR:
			return {
				...state,
				constructor: initialStateConstructor
			}

	    default:
		    return state;	
	}
}