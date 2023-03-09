import { FETCH_ORDER_REQUEST, FETCH_ORDER_SUCCESS, FETCH_ORDER_ERROR } from "../action-types";

export const orderActions = {
	requestOrder: () => ({type: FETCH_ORDER_REQUEST}),
    setOrder: (data) => ({type: FETCH_ORDER_SUCCESS, payload: data}),
    //initialOrder: () => ({type: FETCH_ORDER_ERROR})
    initialOrder: (data) => ({type: FETCH_ORDER_SUCCESS, payload: data})
}
