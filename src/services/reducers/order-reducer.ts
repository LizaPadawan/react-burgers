
import { initialState, TinitialState } from "../initial-state" ;
import { FETCH_ORDER_REQUEST, FETCH_ORDER_SUCCESS, FETCH_ORDER_ERROR } from "../action-types";
import { TActions } from "../action-types";
import { TOrder } from "../../components/order-proptypes";
import { TOrderActions } from "../actions/order-actions-creator";

const initialStateOrder = initialState.orderReduser.orderNumber;

export const orderReduser = ( state = initialState.orderReduser, action : TOrderActions) : TinitialState["orderReduser"] => {
	switch(action.type){
		case FETCH_ORDER_REQUEST:
			return state;

		case FETCH_ORDER_SUCCESS:
			console.log("ORDER REDUCER", { ...state, 
				orderNumber: action.payload
			});
			return { ...state, 
				orderNumber: action.payload
			}

		case FETCH_ORDER_ERROR:
			return { ...state, 
				//orderNumber: action.payload
				orderNumber: initialStateOrder
			}

	    default:
		    return { ...state, 
				orderNumber: initialStateOrder
			}
	}
}