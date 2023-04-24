import { FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_SUCCESS, FETCH_INGREDIENTS_ERROR } from "../action-types";
import { TIngredient } from "../../components/ingredients-proptypes";

export interface ISetConstructorAction {
    readonly type: typeof SET_CONSTRUCTOR;
    readonly payload: Array<TIngredient>
}

export interface IFetchIngredientRequestAction {
    readonly type: typeof FETCH_INGREDIENTS_REQUEST;
}

export const ingredientsActions = {
	requestIngredients: () : IFetchIngredientRequestAction => ({type: FETCH_INGREDIENTS_REQUEST}),
    setIngredients: (data : Array<TIngredient>) => ({type: FETCH_INGREDIENTS_SUCCESS, payload: data}),
    initialIngredients: () => ({type: FETCH_INGREDIENTS_ERROR})
}