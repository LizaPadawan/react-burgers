import { initialState } from "../initial-state" ;
import { SET_CURRENT_INGREDIENT, CLEAN_CURRENT_INGREDIENT } from "../action-types";
import { TActions } from "../action-types";

const initialStateCurrentingredient = initialState.currentIngredientReduser.currentIngredient;

export const currentIngredientReduser = ( state = initialState, action : {type: TActions, payload: any}) => {
	switch(action.type){
		case SET_CURRENT_INGREDIENT:
			return {
				...state,
				currentIngredient: action.payload
			}

		case CLEAN_CURRENT_INGREDIENT:
			return {
				...state,
				currentIngredient: initialStateCurrentingredient
			}

	    default:
		    return state;	
	}
}