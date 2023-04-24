import { SET_CONSTRUCTOR, CLEAN_CONSTRUCTOR } from "../action-types";
import { TIngredient } from "../../components/ingredients-proptypes";

export interface ISetConstructorAction {
    readonly type: typeof SET_CONSTRUCTOR;
    readonly payload: Array<TIngredient>
}

export interface ICleanConstructorAction {
    readonly type: typeof CLEAN_CONSTRUCTOR;
}

export const constructorActions = {
    setConstructor: (data : Array<TIngredient>) :  ISetConstructorAction => ({type: SET_CONSTRUCTOR, payload: data}),
    cleanConstructor: () => ({type: CLEAN_CONSTRUCTOR})
}