import { initialState } from "../initial-state" ;
import { FETCH_ORDER_REQUEST, FETCH_ORDER_SUCCESS, FETCH_ORDER_ERROR } from "../action-types";

const initialStateOrder = initialState.orderReduser;

export const orderReduser = ( state = initialStateOrder, action) => {
	switch(action.type){
		case FETCH_ORDER_REQUEST:
			return state;

		case FETCH_ORDER_SUCCESS:
			console.log("orderReducerSuccess", action.payload);
			return action.payload;

		case FETCH_ORDER_ERROR:
			return initialStateOrder;

	    default:
		    return initialStateOrder;	
	}
}