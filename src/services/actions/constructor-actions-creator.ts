import { SET_CONSTRUCTOR, CLEAN_CONSTRUCTOR } from "../action-types";
import { TIngredient } from "../../components/ingredients-proptypes";

export const constructorActions = {
    setConstructor: (data : Array<TIngredient>) => ({type: SET_CONSTRUCTOR, payload: data}),
    cleanConstructor: () => ({type: CLEAN_CONSTRUCTOR})
}