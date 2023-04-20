import { FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_SUCCESS, FETCH_INGREDIENTS_ERROR } from "../action-types";
import { TIngredient } from "../../components/ingredients-proptypes";

export const ingredientsActions = {
	requestIngredients: () => ({type: FETCH_INGREDIENTS_REQUEST}),
    setIngredients: (data : Array<TIngredient>) => ({type: FETCH_INGREDIENTS_SUCCESS, payload: data}),
    initialIngredients: () => ({type: FETCH_INGREDIENTS_ERROR})
}