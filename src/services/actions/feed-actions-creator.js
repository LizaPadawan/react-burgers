import { FETCH_FEED_REQUEST, FETCH_FEED_SUCCESS, FETCH_FEED_ERROR } from "../action-types";

export const feedActions = {
	requestFeed: () => ({type: FETCH_FEED_REQUEST}),
    setFeed: (data) => ({type: FETCH_FEED_SUCCESS, payload: data}),
    initialFeed: () => ({type: FETCH_FEED_ERROR})
}