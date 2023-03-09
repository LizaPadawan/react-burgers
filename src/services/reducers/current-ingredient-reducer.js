import { initialState } from "../initial-state" ;
import { SET_CURRENT_INGREDIENT, CLEAN_CURRENT_INGREDIENT } from "../action-types";

const initialStateCurrentingredient = initialState.currentIngredientReduser;

export const currentIngredientReduser = ( state = initialStateCurrentingredient, action) => {
	switch(action.type){
		case SET_CURRENT_INGREDIENT:
			return action.payload;

		case CLEAN_CURRENT_INGREDIENT:
			return initialStateCurrentingredient;

	    default:
		    return state;	
	}
}