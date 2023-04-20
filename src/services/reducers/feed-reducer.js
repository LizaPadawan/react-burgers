import { initialState } from "../initial-state" ;
import { FETCH_FEED_REQUEST, FETCH_FEED_SUCCESS, FETCH_FEED_ERROR } from "../action-types";

export const feedReducer = ( state = initialState, action) => {
	switch(action.type){
		case FETCH_FEED_REQUEST:
			return state;

		case FETCH_FEED_SUCCESS:
			//console.log("userReduserSuccess", action.payload);
			return {
				...state,
				orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
			}

		case FETCH_FEED_ERROR:
			return {
				...state,
				orders: initialState.feedReducer.orders,
                total: initialState.feedReducer.total,
                totalToday: initialState.feedReducer.totalToday
			}

	    default:
		    return state;	
	}
}