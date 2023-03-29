import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from "../action-types";

export const userActions = {
	requestUser: () => ({type: FETCH_USER_REQUEST}),
    setUser: (data) => ({type: FETCH_USER_SUCCESS, payload: data}),
    initialUser: () => ({type: FETCH_USER_ERROR})
}