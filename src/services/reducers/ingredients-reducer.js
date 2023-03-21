// import { initialState } from "../initial-state" ;
// import { FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_SUCCESS, FETCH_INGREDIENTS_ERROR } from "../action-types";

// const initialStateIngredients = initialState.ingredientsReduser;

// export const ingredientsReduser = ( state = initialStateIngredients, action) => {
// 	switch(action.type){
// 		case FETCH_INGREDIENTS_REQUEST:
// 			return state;

// 		case FETCH_INGREDIENTS_SUCCESS:
// 			return action.payload;

// 		case FETCH_INGREDIENTS_ERROR:
// 			return initialStateIngredients;

// 	    default:
// 		    return state;	
// 	}
// }

import { initialState } from "../initial-state" ;
import { FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_SUCCESS, FETCH_INGREDIENTS_ERROR } from "../action-types";

const initialStateIngredients = initialState.ingredientsReduser.ingredients;

export const ingredientsReduser = ( state = initialState, action) => {
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
