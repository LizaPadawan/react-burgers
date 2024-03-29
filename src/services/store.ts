import { rootReducer } from "./reducers/root-reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS,
    WS_SEND_MESSAGE,
    WS_SEND_PONG,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_END,
  } from "./action-types";

import { socketMiddleware } from "./socketMiddleware";
import { TinitialState } from "./initial-state";
import { WS_BASE_URL } from "../utils/const";

export const wsUrl = WS_BASE_URL + "/all";

export const wsActions = {
  wsStart: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  wsClose: WS_CONNECTION_END,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onGetOrders: WS_GET_ORDERS,
  wsPingPong: WS_SEND_PONG,
};

export const configureStore = (initialState : TinitialState) => {

    const store = createStore(
	    rootReducer,
	    initialState,
        composeWithDevTools(
		    applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)
		    )
        )
    );

    return store;
};



