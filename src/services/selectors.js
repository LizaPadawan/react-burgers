export const ingredientsSelector = (state) => state.ingredientsReduser.ingredients
export const constructorSelector = (state) => state.constructorReduser.constructor
export const openModalSelector = (state) => state.modalReduser.isModalOpen
export const currentIngredientSelector = (state) => state.currentIngredientReduser.currentIngredient
export const currentOrderSelector = (state) => state.orderReduser.orderNumber
export const userSelector = (state) => state.userReducer.user;
export const isAuthSelector = (state) => state.authCheckReducer.isAuthChecked