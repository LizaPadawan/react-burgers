import { SET_CURRENT_INGREDIENT, CLEAN_CURRENT_INGREDIENT } from "../action-types";

export const currentIngredientActions = {
    setCurrentIngredient: (data) => ({type: SET_CURRENT_INGREDIENT, payload: data}),
    cleanCurrentIngredient: () => ({type: CLEAN_CURRENT_INGREDIENT})
}