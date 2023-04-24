import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from "../action-types";
import { TInUser } from "../../components/order-proptypes";

export interface IFetchUserSuccessAction {
    readonly type: typeof FETCH_USER_SUCCESS;
    readonly payload: TInUser
}

export interface IFetchUserRequestAction {
    readonly type: typeof FETCH_USER_REQUEST;
}

export interface IFetchUserErrorAction {
    readonly type: typeof FETCH_USER_ERROR;
}

export type TUserActions = IFetchUserSuccessAction | IFetchUserRequestAction | IFetchUserErrorAction;

export const userActions = {
	requestUser: () : IFetchUserRequestAction => ({type: FETCH_USER_REQUEST}),
    setUser: (data : TInUser) : IFetchUserSuccessAction => ({type: FETCH_USER_SUCCESS, payload: data}),
    initialUser: () :IFetchUserErrorAction => ({type: FETCH_USER_ERROR})
}