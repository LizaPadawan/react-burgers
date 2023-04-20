import { FETCH_USER_FEED_REQUEST, FETCH_USER_FEED_SUCCESS, FETCH_USER_FEED_ERROR } from "../action-types";

export const userFeedActions = {
	requestUserFeed: () => ({type: FETCH_USER_FEED_REQUEST}),
    setUserFeed: (data) => ({type: FETCH_USER_FEED_SUCCESS, payload: data}),
    initialUserFeed: () => ({type: FETCH_USER_FEED_ERROR})
}