export const ingredientsSelector = (state) => state.ingredientsReduser
export const constructorSelector = (state) => state.constructorReduser
export const openModalSelector = (state) => state.modalReduser
export const currentIngredientSelector = (state) => state.currentIngredientReduser
export const currentOrderSelector = (state) => {console.log(state); return state.orderReduser.orderNumber}
export const userSelector = (state) => state.userReducer.user
