import { SET_CONSTRUCTOR, CLEAN_CONSTRUCTOR } from "../action-types";

export const constructorActions = {
    setConstructor: (data) => ({type: SET_CONSTRUCTOR, payload: data}),
    cleanConstructor: () => ({type: CLEAN_CONSTRUCTOR})
}