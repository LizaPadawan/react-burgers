
import { TIngredient } from "../components/ingredients-proptypes";
import { TOrder } from "../components/order-proptypes";

export type TinitialState = { 
	ingredientsReduser: {
		ingredients: TIngredient[];
	};
	constructorReduser: {
		constructor: TIngredient[];
	};
	modalReduser: {
		isModalOpen: boolean;
	};
    currentIngredientReduser: {
		currentIngredient: string;
	},
    orderReduser: { 
		orderNumber: null | number;
	},
	userReducer: {
		user: {
		  email: string;
		  name: string;
		}
	},
	authCheckReducer: {
		isAuthChecked: boolean;
	},
	wsReducer: {	
		wsConnected: boolean;
		orders: TOrder[],
		error: undefined | string,
		total: number,
		totalToday: number
	}
};


export const initialState : TinitialState = { 
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
	},
	wsReducer: {	
		wsConnected: false,
		orders: [],
		error: undefined,
		total: 0,
		totalToday: 0
	}
};