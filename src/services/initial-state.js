
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
	},
	feedReducer : {
		orders: [
			{
			  "ingredients": [
				"643d69a5c3f7b9001cfa093c",
				"643d69a5c3f7b9001cfa0941",
				"643d69a5c3f7b9001cfa093e",
				"643d69a5c3f7b9001cfa0942"
			  ],
			  "_id": "mumu",
			  "status": "done",
			  "name": "Самый прекрасный заказ",
			  "number": 0,
			  "createdAt": "2021-06-23T14:43:22.587Z",
			  "updatedAt": "2021-06-23T14:43:22.603Z"
			},
			{
				"ingredients": [
				  "643d69a5c3f7b9001cfa093c",
				  "643d69a5c3f7b9001cfa0941",
				  "643d69a5c3f7b9001cfa093e",
				  "643d69a5c3f7b9001cfa0942"
				],
				"_id": "lala",
				"status": "done",
				"name": "Еще прекраснее",
				"number": 0,
				"createdAt": "2021-06-23T14:43:22.587Z",
				"updatedAt": "2021-06-23T14:43:22.603Z"
			  }
		  ],
		  total: 1,
		  totalToday: 1
		// orders: [],
		// total: 0,
		// totalToday: 0
	},
	userFeedReducer : {
		"orders": [
			{
			  "ingredients": [
				"60d3463f7034a000269f45e9",
				"60d3463f7034a000269f45e7"
			  ],
			  "_id": "",
			  "status": "done",
			  "number": 1,
			  "createdAt": "2021-06-23T20:11:01.403Z",
			  "updatedAt": "2021-06-23T20:11:01.406Z"
			},
			{
			  "ingredients": [
				"60d3463f7034a000269f45e9"
			  ],
			  "_id": "",
			  "status": "done",
			  "number": 3,
			  "createdAt": "2021-06-23T20:13:23.654Z",
			  "updatedAt": "2021-06-23T20:13:23.657Z"
			}
		  ],
		  "total": 2,
		  "totalToday": 2
		// orders: [],
		// total: 0,
		// totalToday: 0
	}
};