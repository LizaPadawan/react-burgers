import { initialState } from "../initial-state" ;
import { FETCH_USER_FEED_REQUEST, FETCH_USER_FEED_SUCCESS, FETCH_USER_FEED_ERROR } from "../action-types";

export const userFeedReducer = ( state = initialState, action) => {
	switch(action.type){
		case FETCH_USER_FEED_REQUEST:
			return state;

		case FETCH_USER_FEED_SUCCESS:
			//console.log("userReduserSuccess", action.payload);
			return {
				...state,
				orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
			}

		case FETCH_USER_FEED_ERROR:
			return {
				...state,
				orders: initialState.userFeedReducer.orders,
                total: initialState.userFeedReducer.total,
                totalToday: initialState.userFeedReducer.totalToday
			}

	    default:
		    return state;	
	}
}