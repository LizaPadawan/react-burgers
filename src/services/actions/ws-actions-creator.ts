import { WS_SEND_MESSAGE,WS_CONNECTION_CLOSED,WS_CONNECTION_END, WS_CONNECTION_ERROR,WS_CONNECTION_START,WS_CONNECTION_SUCCESS, WS_GET_ORDERS,WS_SEND_PONG } from "../action-types";

export function wsConnectionSuccess() {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
}

export function wsConnectionStart(url: string) {
  return {
    type: WS_CONNECTION_START,
    payload: url,
  };
}

export function wsGetOrders(orders: any) {
  return {
    type: WS_GET_ORDERS,
    payload: orders,
  };
}

export const wsSendMessage = (message : any) => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message,
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};