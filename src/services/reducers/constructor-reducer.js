import { initialState } from "../initial-state" ;
import { SET_CONSTRUCTOR, CLEAN_CONSTRUCTOR } from "../action-types";

const initialStateConstructor = initialState.constructorReduser;

export const constructorReduser = ( state = initialStateConstructor, action) => {
	switch(action.type){
		case SET_CONSTRUCTOR:
			return action.payload;

		case CLEAN_CONSTRUCTOR:
			return initialStateConstructor;

	    default:
		    return state;	
	}
}