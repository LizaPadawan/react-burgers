import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_ORDERS } from "../action-types";
import wsReducer from "./ws-reducer";
import { initialState as init } from "../initial-state";

const initialState = init.wsReducer;

const mockedData = {
    data: {
        orders: [{
            "_id": "643d69a5c3f7b9001cfa093d",
            "name": "Флюоресцентная булка R2-D3",
            "type": "bun",
            "proteins": 44,
            "fat": 26,
            "carbohydrates": 85,
            "calories": 643,
            "price": 988,
            "image": "https://code.s3.yandex.net/react/code/bun-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
            "__v": 0
        }],
        total: 23,
        totalToday: 1
    }
};

describe("wsReducer", () => {

    it("should return the initial state", () => {
      expect(
        wsReducer(undefined, {type: undefined})
      ).toEqual(initialState);
    });

    it("should return ws connected", () => {
        expect(
          wsReducer(initialState, {type: WS_CONNECTION_SUCCESS})
        ).toEqual({ ...initialState, wsConnected: true});
      });

    it("should return ws error", () => {
        expect(
          wsReducer(initialState, {type: WS_CONNECTION_ERROR})
        ).toEqual({ ...initialState, wsConnected: false});
      });

      it("should return the initial state by WS_CONNECTION_CLOSED", () => {
        expect(
            wsReducer(initialState, {type: WS_CONNECTION_CLOSED})
        ).toEqual(initialState);
      });

    it("should return data with WS_GET_ORDERS", () => {
        expect(
            wsReducer({
            ...initialState,
          }, {type: WS_GET_ORDERS, payload: mockedData})
        ).toEqual( {
            ...initialState,
            orders: mockedData.data.orders,
            total: mockedData.data.total,
            totalToday: mockedData.data.totalToday,
          });
      });
});