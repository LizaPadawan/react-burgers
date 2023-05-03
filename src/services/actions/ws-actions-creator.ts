import { TOrders } from "../../components/order-proptypes";
import { WS_SEND_MESSAGE,WS_CONNECTION_CLOSED,WS_CONNECTION_END, WS_CONNECTION_ERROR,WS_CONNECTION_START,WS_CONNECTION_SUCCESS, WS_GET_ORDERS,WS_SEND_PONG } from "../action-types";

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

export interface IWsGetOrdersAction {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: TOrders;
}

export type TWsActions = IWsConnectionSuccessAction | IWsConnectionCloseAction | IWsConnectionErrorAction | IWsConnectionStartAction | IWsGetOrdersAction;

export function wsConnectionSuccess() : IWsConnectionSuccessAction {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
}

export function wsConnectionStart(url: string) : IWsConnectionStartAction {
  return {
    type: WS_CONNECTION_START,
    payload: url,
  };
}

export function wsGetOrders(orders: TOrders) : IWsGetOrdersAction {
  return {
    type: WS_GET_ORDERS,
    payload: orders,
  };
}

// export const wsSendMessage = (message : any) => {
//   return {
//     type: WS_SEND_MESSAGE,
//     payload: message,
//   };
// };

export const wsConnectionError = () : IWsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = () : IWsConnectionCloseAction => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};