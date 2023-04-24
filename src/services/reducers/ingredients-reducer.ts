
import { initialState, TinitialState } from "../initial-state" ;
import { FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_SUCCESS, FETCH_INGREDIENTS_ERROR } from "../action-types";
import { TActions } from "../action-types";
import { TIngredientsActions } from "../actions/ingredients-actions-creator";

const initialStateIngredients = initialState.ingredientsReduser.ingredients;

export const ingredientsReduser = ( state = initialState.ingredientsReduser, action : TIngredientsActions) : TinitialState["ingredientsReduser"] => {
	switch(action.type){
		case FETCH_INGREDIENTS_REQUEST:
			return state;

		case FETCH_INGREDIENTS_SUCCESS:
			return {
				...state,
				ingredients: action.payload
			};

		case FETCH_INGREDIENTS_ERROR:
			return {
				...state,
				ingredients: initialStateIngredients
			};


	    default:
		    return state;	
	}
}
