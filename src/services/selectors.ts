import { TinitialState } from "./initial-state"

export const ingredientsSelector = (state : TinitialState) => state.ingredientsReduser.ingredients
export const constructorSelector = (state : TinitialState) => state.constructorReduser.constructor
export const openModalSelector = (state : TinitialState) => state.modalReduser.isModalOpen
export const currentIngredientSelector = (state : TinitialState) => state.currentIngredientReduser.currentIngredient
export const currentOrderSelector = (state : TinitialState) => state.orderReduser.orderNumber
export const userSelector = (state : TinitialState)=> state.userReducer.user
export const isAuthSelector = (state : TinitialState) => state.authCheckReducer.isAuthChecked
export const wsSelector = (state : TinitialState) => state.wsReducer