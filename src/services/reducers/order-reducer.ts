
import { initialState } from "../initial-state" ;
import { FETCH_ORDER_REQUEST, FETCH_ORDER_SUCCESS, FETCH_ORDER_ERROR } from "../action-types";
import { TActions } from "../action-types";

const initialStateOrder = initialState.orderReduser.orderNumber;

export const orderReduser = ( state = initialState, action : {type: TActions, payload: any}) => {
	switch(action.type){
		case FETCH_ORDER_REQUEST:
			return state;

		case FETCH_ORDER_SUCCESS:
			//console.log("orderReduserSuccess", action.payload);
			return { ...state, 
				orderNumber: action.payload
			}

		case FETCH_ORDER_ERROR:
			return { ...state, 
				orderNumber: action.payload
			}

	    default:
		    return { ...state, 
				orderNumber: initialStateOrder
			}
	}
}