
export const initialState = { 
	ingredientsReduser: {
		ingredients: [],
	},
	constructorReduser: {
		constructor: [],
	},
	modalReduser: {
		isModalOpen: false,
	},
    currentIngredientReduser: {
		currentIngredient: "",
	},
    orderReduser: { 
		orderNumber: null
	},
	userReducer: {
		user: {
		  email: "",
		  name: ""
		}
	},
	authCheckReducer: {
		isAuthChecked: false
	}
};