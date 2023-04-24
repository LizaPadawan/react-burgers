import { FETCH_ORDER_REQUEST, FETCH_ORDER_SUCCESS, FETCH_ORDER_ERROR } from "../action-types";

export interface IFetchOrderSuccessAction {
    readonly type: typeof FETCH_ORDER_SUCCESS;
    readonly payload: number;
}

export interface IFetchOrderRequestAction {
    readonly type: typeof FETCH_ORDER_REQUEST;
}

export interface IFetchOrderErrorAction {
    readonly type: typeof FETCH_ORDER_ERROR;
}

export type TOrderActions = IFetchOrderSuccessAction | IFetchOrderRequestAction | IFetchOrderErrorAction;

export const orderActions = {
	requestOrder: () : IFetchOrderRequestAction => ({type: FETCH_ORDER_REQUEST}),
    setOrder: (data : number) : IFetchOrderSuccessAction => ({type: FETCH_ORDER_SUCCESS, payload: data}),
    initialOrder: () : IFetchOrderErrorAction => ({type: FETCH_ORDER_ERROR})
}
