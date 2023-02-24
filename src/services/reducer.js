import { initialState } from "./initial-state" ;
import { FETCH_INGREDIENTS, FETCH_INGREDIENTS_STATE, GET_CONSTRUCTOR, ADD_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS, FETCH_ORDER, IS_MODAL_OPEN } from "./action-types";

export const rootReduser = ( state = initialState, action) => {
	switch(action.type){
		case FETCH_INGREDIENTS:
			return {
				...state,
				ingredients: action.payload,
			}

        case FETCH_INGREDIENTS_STATE:
            return {
                ...state,
                fetchIngredients: action.payload,
        }

		case GET_CONSTRUCTOR:
			return {
				...state,
				constructor: action.payload,
            }

		case ADD_INGREDIENT_DETAILS:
			return {
				...state,
				currentIngredient: action.payload,
            }

        case DELETE_INGREDIENT_DETAILS:
            return {
                ...state,
                currentIngredient: "",
            }

        case FETCH_ORDER:
            return {
                ...state,
                currentOrder: action.payload,
            }

        case IS_MODAL_OPEN:
            return {
                ...state,
                isOpenModal: action.payload,
            }

	    default:
		    return state;	
	}
}
