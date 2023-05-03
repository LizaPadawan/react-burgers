import { FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_SUCCESS, FETCH_INGREDIENTS_ERROR } from "../action-types";
import { TIngredient } from "../../components/ingredients-proptypes";

export interface IFetchIngredientSuccessAction {
    readonly type: typeof FETCH_INGREDIENTS_SUCCESS;
    readonly payload: Array<TIngredient>
}

export interface IFetchIngredientRequestAction {
    readonly type: typeof FETCH_INGREDIENTS_REQUEST;
}

export interface IFetchIngredientErrorAction {
    readonly type: typeof FETCH_INGREDIENTS_ERROR;
}

export type TIngredientsActions = IFetchIngredientSuccessAction | IFetchIngredientRequestAction | IFetchIngredientErrorAction;

export const ingredientsActions = {
	requestIngredients: () : IFetchIngredientRequestAction => ({type: FETCH_INGREDIENTS_REQUEST}),
    setIngredients: (data : Array<TIngredient>) : IFetchIngredientSuccessAction => ({type: FETCH_INGREDIENTS_SUCCESS, payload: data}),
    initialIngredients: () : IFetchIngredientErrorAction => ({type: FETCH_INGREDIENTS_ERROR})
}